const http = require('http');
// Création du serveur
const server = http.createServer(function (request, response) {
response.writeHead(200);
response.end('Hello World!');
});
//  Démarrer le serveur HTTP en écoutant le port 4000 
// Exécuter une fonction pendant que le serveur est à l’écoute
server.listen(4000, () =>
console.log('Adresse du serveur : http://localhost:4000'));