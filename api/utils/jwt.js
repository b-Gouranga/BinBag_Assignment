const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');

module.exports = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};
