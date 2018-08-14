let usuario = require('../controllers/usuario');
const authenticator = require('../middleware/authenticator');

module.exports = server => {
    server.post('/user', usuario.create);
    server.post('/logar', usuario.logar);
    server.get('/users', usuario.getAll);
};