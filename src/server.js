const server = require('express')();
const models = require('./models');
const cors = require('./middleware/cors');
const routes = require('./routes/usuario');
const queryParser = require('express-query-int');
const bodyParser = require('body-parser');

server.use(cors);
server.use(queryParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

routes(server);

models.sequelize.sync().then(() => {
    server.listen(process.env.PORT, function () {
        console.log(`Server rodando na porta: ${process.env.PORT}`);
    });
});

module.exports = server;