const crypt = require('bcrypt');

module.exports = {
    encode: (senha) => {
        return new Promise((resolve, reject) => {
            crypt.genSalt(12, (err, salt) => {
                if(err) reject(err);
                crypt.hash(senha, salt, (err, hash) => {
                    if (err) reject(err);
                    else resolve(hash);
                });
            });
        });
    },
    decode: (password, hash) => {
        return new Promise((resolve, reject) => {
            crypt.compare(password, hash, (err, isMatch) => {
                if (err) reject('Erro na autenticação do usuário.');
                if (isMatch) resolve();
                else reject('Senha invalida.');
            })
        });
    }
};