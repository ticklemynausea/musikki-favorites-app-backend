'use strict';
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];
var Hapi = require('hapi');

/* Sequelize db */
var db = require('./models');

var Auth = require('./lib/Auth')();

/* Hapi server */
var server = new Hapi.Server({
    connections: {
        routes: {
            cors: true
        }
    },
    debug: {
        request: ['error']
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
        validateFunc: Auth.tokenValidator
    });

});

server.on('response', function (request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});

var controllers = require('./controllers')(db, Auth);

var routes = require('./routes')(server, controllers);

db.sequelize.sync().then(function() {
    server.start(function() {
        console.log('Running on 3000');
    });
});