const jwt = require('jsonwebtoken');

function signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
}

function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = { signToken, verifyToken };