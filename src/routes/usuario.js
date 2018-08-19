let usuario = require('../controllers/usuario');

module.exports = server => {
    server.post('/user', usuario.create);
    server.post('/logar', usuario.logar);
    server.get('/users', usuario.getAll);
    server.get('/autenticar', usuario.autenticar);
};