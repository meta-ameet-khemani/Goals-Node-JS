const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/.env'});

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) res.status(401).json({ success: false, details: 'Access denied' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ success: false, details: 'Invalid token' });
    }
}