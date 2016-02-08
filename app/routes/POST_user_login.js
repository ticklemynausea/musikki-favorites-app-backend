'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'POST',
        path: '/user/login',
        handler: controllers.Users.logIn,
        config: {
            auth: false
        }
    });

};