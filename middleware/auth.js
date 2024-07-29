const jwt = require('jsonwebtoken');
const User = require('../models/Login'); // Adjust the path as necessary

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

const auth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ error: 'Invalid token: user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = auth;