module.exports = {
    validar(user) {
        if (!user.nome || !user.nome.trim()) throw new Error('Usuário não foi informado.');
        if (!user.senha || !user.senha.trim()) throw new Error('Senha não foi informada.');
        if(user.nome.length < 4) throw new Error('Usuário precisa ter pelo menos 4 caracteres.');
        if(user.senha.length < 4) throw new Error('Senha precisa ter pelo menos 4 caracteres');
    }
};