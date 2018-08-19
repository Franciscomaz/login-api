const usuarioService = require('../services/usuario');
const userValidator = require('../validators/usuario');

module.exports = {
    async create(req, res) {
        await userValidator.validar(req.body).then(user => {
            usuarioService.criar(user).then(user => {
                res.send(user);
            }).catch(err => {
                res.status(500).send({
                    error: err
                });
            });
        }).catch(err => {
            res.status(400).send({
                error: err
            });
        });
    },
    async getAll(req, res) {
        await usuarioService.findAll().then(users => {
            res.send(users);
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'Ocorreu um erro ao buscar os registros'
            })
        });
    },
    async logar(req, res) {
        await usuarioService.logar(req.body).then(token => {
            res.send(token);
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            })
        });
    },
    async put(req, res) {
        await usuarioService.atualizar(req.body).then(user => {
            res.send(user);
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'Ocorreu um errou ao alterar o registro'
            });
        });
    },
    async autenticar(req, res) {
        console.log(req.param('token'));
        await usuarioService.autenticar(req.param('token')).then(user => {
            res.send(user);
        }).catch(err => {
            res.status(401).send({
                status: 401,
                error: err
            })
        })
    }
};