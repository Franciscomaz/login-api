let usuario = require('../controllers/usuario');
const middleware = require('./middleware');

module.exports = server => {
    server.get('/create-user', usuario.create);
    server.get('/logar', usuario.logar);
    server.get('/usuarios', usuario.getAll);
};