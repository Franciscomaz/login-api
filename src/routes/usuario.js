let usuario = require('../controllers/usuario');
const authenticator = require('../middleware/authenticator');

module.exports = server => {
    server.post('/create-user', usuario.create);
    server.post('/logar', usuario.logar);
    server.get('/usuarios', usuario.getAll);
};