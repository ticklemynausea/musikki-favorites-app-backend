'use strict';
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];
var Hapi = require('hapi');

/* Sequelize db */
var db = require('./models');

var auth = require('./lib/auth')();

/* Hapi server */
var server = new Hapi.Server({
    debug: {
        request: []
    }
});

server.connection({ port : config.port })

/* setup auth */
server.register(require('hapi-auth-jwt2'), function(err) {

    if (err) {
        console.error('Failed to load plugin:', err);
    }

    server.auth.strategy('jwt', 'jwt', true, {
        key: config.auth.key,
        verifyOptions: {
            algorithms: ['HS256']
        },
        validateFunc: auth.requestValidationFunction
    });

});



server.on('response', function (request) {

    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);

});

var controllers = require('./controllers')(db);

var routes = require('./routes')(server, controllers);

db.sequelize.sync().then(function() {
    server.start(function() {
        console.log('Running on 3000');
    });
});