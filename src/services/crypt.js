const crypt = require('bcrypt');

module.exports = {
    encode: async (senha) => {
        return crypt.genSalt(12, (err, salt) => {
            if (err) {
                return err;
            }

            return crypt.hash(senha, salt, (err, hash) => {
                if (err) {
                    return err;
                }

                return hash;
            });
        });
    },
    matches: async (password, hash) => {
        return crypt.compare(password, hash, (err, matches) => {
            if (err) {
                throw new Error('Erro na autenticação do usuário');
            }

            return matches;
        });
    }
};