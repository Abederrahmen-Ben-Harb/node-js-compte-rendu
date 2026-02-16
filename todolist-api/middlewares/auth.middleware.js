const {verifyToken} = require('../utils/jwt');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startWith('Bearer ')) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    try {
        const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if(!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authMiddleware;