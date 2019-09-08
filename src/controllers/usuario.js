const usuarioService = require('../services/usuario');
const userValidator = require('../validators/usuario');

module.exports = {
    async create(req, res) {
        try {
            userValidator.validar(req.body);
        } catch (err) {
            res.status(400).send({
                error: err
            });
        }

        try {
            const user = await usuarioService.criar(req.body);
            res.send(user);
        } catch (err) {
            res.status(500).send({
                error: err
            });
        }
    },
    async getAll(req, res) {
        try {
            const users = await usuarioService.findAll();
            res.send(users);
        } catch (err) {
            res.status(500).send({
                error: 'Ocorreu um erro ao buscar os registros'
            });
        }
    },
    async logar(req, res) {
        try {
            userValidator.validar(req.body);
        } catch (err) {
            res.status(400).send({
                error: err
            });
        }

        try {
            const token = await usuarioService.logar(req.body);
            res.send(token);
        } catch (err) {
            res.status(500).send({
                error: err
            });
        }
    },
    async update(req, res) {
        try {
            userValidator.validar(req.body);
        } catch (err) {
            res.status(400).send({
                error: err
            });
        }

        try {
            const user = await usuarioService.atualizar(req.body);
            res.send(user);
        } catch (err) {
            res.status(500).send({
                error: 'Ocorreu um errou ao alterar o registro'
            });
        }
    },
    async autenticar(req, res) {
        try {
            const user = usuarioService.autenticar(req.param('token'));
            res.send(user);
        } catch (err) {
            res.status(401).send({
                error: err
            });
        }
    }
};