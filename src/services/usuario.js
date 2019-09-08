const {Usuario} = require('../models');
const sessao = require('../services/sessao');
const crypt = require('../services/crypt');

module.exports = {
    async criar(user) {
        const foundUser = await this.findByName(user);
        
        if (foundUser) {
            throw new Error('Usuário já existe');
        }
        
        return Usuario.create(user);
    },
    async findAll() {
        return Usuario.findAll();
    },
    async findByName(user) {
        return Usuario.find({
            where: {
                nome: user.nome
            }
        });
    },
    async atualizar(user) {
        return Usuario.update(user, {
            where: {
                id: user.id
            }
        });
    },
    async logar(representation) {
        try {
            const entity = await this.findByName(representation.nome);

            if (!entity) {
                throw new Error(`Usuário ${representation.nome} não encontrado`);
            }

            if (crypt.matches(representation.senha, entity.senha)) {
                throw new Error('Senha inválida');
            }

            return sessao.criar(entity.dataValues);
        } catch (err) {
            console.error('Falha no login: ', err);
            throw new Error(err);
        }

    },
    async autenticar(token) {
        const resutado = sessao.autenticar(token);

        if (resutado.err) {
            throw new Error('Falha na autenticação do token');
        }

        return resutado.decoded;
    }
};