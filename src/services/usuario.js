const {Usuario} = require('../models');
const sessao = require('../services/sessao');
const crypt = require('../services/crypt');

module.exports = {
    async criar(usuario) {
        return new Promise((resolve, reject) => {
            this.findByName(usuario).then(user => {
                console.log(usuario);
                if (user) reject('Usuário já existe');
                else resolve(Usuario.create(usuario));
            }).catch(err => {
                reject(err);
            })
        });
    },
    async findByName(user) {
        return new Promise((resolve, reject) => {
            resolve(Usuario.find({where: {nome: user.nome}}));
            reject('Ocorreu um erro ao buscar o registro.');
        });
    },
    async findAll() {
        return new Promise((resolve, reject) => {
            try {
                resolve(Usuario.findAll());
            } catch (err) {
                reject(err);
            }
        });
    },
    async atualizar(user) {
        return new Promise((resolve, reject) => {
            try {
                resolve(Usuario.update(user, {where: {id: user.id}}));
            } catch (err) {
                reject(err);
            }
        });
    },
    async logar(query) {
        return new Promise((resolve, reject) => {
            this.findByName(query).then(user => {
                if (!user) reject('Usuário não encontrado.');
                crypt.decode(query.senha, user.senha).then(() => {
                    resolve(sessao.criar(user.dataValues))
                }).catch(err => {
                    reject(err);
                });
            });
        });
    },
    async autenticar(token) {
        return new Promise((resolve, reject) => {
            const resutado = sessao.autenticar(token);
            if(resutado.err) {
                reject('Falha na autenticação do token.');
            } else {
                resolve(resutado.decoded);
            }
        })
    }
};