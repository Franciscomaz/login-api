let crypt = require('../services/crypt');

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        nome: {type: DataTypes.STRING(100), unique: true, allowNull: false},
        email: DataTypes.STRING(100),
        senha: {type: DataTypes.STRING(100), allowNull: false}
    }, {
        classMethods: {
            validPassword: crypt.decode
        }
    });
    Usuario.beforeCreate((usuario) => {
        return crypt.encode(usuario.senha).then(hash => {
            usuario.senha = hash;
        }).catch(err => {
            console.log(err);
        })
    });
    return Usuario
};