const sessao = require('../services/sessao')

module.exports = {
    requireLogin: (req, res, next) => {
        const response = sessao.validar(req.token);
        if (response.err) {
            next();
        } else {
            res.redirect("/login"); // or render a form, etc.
        }
    }
};
