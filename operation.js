const http = require('http');
const url = require('url');

// Fonction pour calculer le résultat
function calculateResult(reqUrl) {
    const parsedUrl = url.parse(reqUrl, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    
    // Extraction de l'opération depuis le chemin
    const operation = pathname.replace('/', '').toLowerCase();
    
    // Conversion des paramètres en nombres
    const params = {};
    for (const key in query) {
        const value = parseFloat(query[key]);
        if (isNaN(value)) {
            return `Erreur : le paramètre '${key}' n'est pas un nombre valide`;
        }
        params[key] = value;
    }
    
    // Exécution de l'opération
    switch (operation) {
        case 'addition':
            // Vérification des paramètres nécessaires
            if (!params.x || !params.y || !params.z) {
                return "Erreur : paramètres x, y et z requis pour l'addition";
            }
            const sum = params.x + params.y + params.z;
            return `Resultat : ${Number.isInteger(sum) ? sum : sum.toFixed(2)}`;
            
        case 'multiplication':
            // Vérification des paramètres nécessaires
            if (!params.a || !params.b) {
                return "Erreur : paramètres a et b requis pour la multiplication";
            }
            const product = params.a * params.b;
            return `Resultat : ${Number.isInteger(product) ? product : product.toFixed(2)}`;
            
        case 'soustraction':
            const subKeys = Object.keys(params);
            if (subKeys.length < 2) {
                return "Erreur : au moins deux nombres requis pour la soustraction";
            }
            let subtractionResult = params[subKeys[0]];
            for (let i = 1; i < subKeys.length; i++) {
                subtractionResult -= params[subKeys[i]];
            }
            return `Resultat : ${Number.isInteger(subtractionResult) ? subtractionResult : subtractionResult.toFixed(2)}`;
            
        case 'division':
            const divKeys = Object.keys(params);
            if (divKeys.length < 2) {
                return "Erreur : au moins deux nombres requis pour la division";
            }
            let divisionResult = params[divKeys[0]];
            for (let i = 1; i < divKeys.length; i++) {
                if (params[divKeys[i]] === 0) {
                    return "Erreur : division par zéro";
                }
                divisionResult /= params[divKeys[i]];
            }
            return `Resultat : ${Number.isInteger(divisionResult) ? divisionResult : divisionResult.toFixed(2)}`;
            
        default:
            return `Erreur : opération '${operation}' non reconnue. Opérations disponibles : addition, soustraction, multiplication, division`;
    }
}

// Création du serveur HTTP
const server = http.createServer((req, res) => {
    // Configuration des headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    // Traitement de la requête
    const result = calculateResult(req.url);
    
    // Envoi de la réponse
    res.statusCode = result.startsWith('Erreur') ? 400 : 200;
    res.end(result);
});

// Démarrage du serveur
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log('Exemples d\'utilisation :');
    console.log(`http://localhost:${PORT}/addition?x=5&y=9&z=8`);
    console.log(`http://localhost:${PORT}/multiplication?a=12&b=11`);
    console.log(`http://localhost:${PORT}/soustraction?x=20&y=8&z=3`);
    console.log(`http://localhost:${PORT}/division?a=100&b=4&c=5`);
});