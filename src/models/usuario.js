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
            validPassword: crypt.matches
        }
    });

    Usuario.beforeCreate(async usuario => {
        try {
            const encodedPassword =  await crypt.encode(usuario.senha);
            usuario.senha = encodedPassword;
        } catch(err) {
            console.log('error: ', err)
        }
    });

    return Usuario;
};