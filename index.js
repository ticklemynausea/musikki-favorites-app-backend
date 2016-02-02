var config = require('./config/config.json');
var Hapi = require('hapi');

/* Sequelize db */
var db = require('./models');

/* Hapi server */
var server = new Hapi.Server();
server.connection({ port : 3000 })

server.route({
    method: 'GET',
    path: '/api',
    handler: function(request, reply) {
        reply({ 'api' : db });
    }
});

db.sequelize.sync().then(function() {
    server.start(function() {
        console.log('Running on 3000');
    });
});