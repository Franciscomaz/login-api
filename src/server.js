const server = require('express')();
const bodyParser = require('body-parser');
const allowCors = require('cors');
const queryParser = require('express-query-int');
const models = require('./models');

require('./routes/usuario')(server);

server.use(allowCors);
server.use(queryParser());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

models.sequelize.sync().then(() =>{
    server.listen(process.env.PORT, function(){
        console.log(`Server rodando na porta: ${process.env.PORT}`)
    })
});

module.exports = server;