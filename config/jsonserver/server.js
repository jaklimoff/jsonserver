var path = require('path');
function getConfigFile(name) {
    return path.join(__dirname, name);
}


var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router(getConfigFile('db.json'));
var middlewares = jsonServer.defaults();
middlewares.push(require(getConfigFile("middleware.js")));

server.use(middlewares);


// Add custom routes before JSON Server router
server.get('/echo', function (req, res) {
    res.jsonp(req.query);
});

server.get('/custom', function (req, res) {
    res.jsonp({
        "whatever": "you want!"
    });
});

server.use(router);

server.listen(3000, function () {
    console.log('JSON Server is running')
});