var { createServer } = require('http');
var url = require('url')
var server = createServer((req, res) => {
var page = url.parse(req.url).pathname;
console.log(page);
res.writeHead(200, { "Content-Type": "text/html" });
res.write('<h1>Hello world, this is your requested page : ' + page+'</h1>');
res.end();
});
server.listen(4000, () =>
console.log('Adresse du serveur : http://localhost:4000'));