module.exports = {
    async validar(user) {
        return new Promise((resolve, reject) => {
                if (!user.nome || !user.nome.trim()) reject('Usuário não foi informado.');
                if (!user.senha || !user.senha.trim()) reject('Senha não foi informada.');
                if(user.nome.length < 4) reject('Usuário precisa ter pelo menos 4 caracteres.');
                if(user.senha.length < 4) reject('Senha precisa ter pelo menos 4 caracteres');
                resolve(user)
            }
        );
    }
};