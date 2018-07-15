module.exports = {
    async validar(user) {
        if (!user.nome) {
            throw new Error('Usuário não foi informado.');
        }
        if (!user.senha) {
            throw new Error('Senha não foi informada.');
        }
    }
};