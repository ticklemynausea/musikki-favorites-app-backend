'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'POST',
        path: '/user/logout',
        handler: controllers.Users.logOut
    });

};