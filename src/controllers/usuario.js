const usuarioService = require('../services/usuario');
const userValidator = require('../validators/usuario');

module.exports = {
    async create(req, res) {
        userValidator.validar(req.body);
        await usuarioService.criar(req.body).then(user => {
            res.send(user);
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
        await await usuarioService.atualizar(req.body).then(user => {
            res.send(user);
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'Ocorreu um errou ao alterar o registro'
            });
        });
    }

};