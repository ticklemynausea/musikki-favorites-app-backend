'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'POST',
        path: '/user/add',
        handler: controllers.Users.addUser,
        config: {
            auth: false
        }
    });

};