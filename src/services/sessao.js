const jwt = require('jsonwebtoken');

module.exports = {
    criar: (usuario) => {
        return jwt.sign(usuario, process.env.JWT_SECRET, {
            expiresIn: 1440
        });
    },
    autenticar: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            return { err: err, decoded: decoded }
        });
    }
};