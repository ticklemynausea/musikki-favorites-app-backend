'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'POST',
        path: '/user/add',
        handler: controllers.Users.addUser
    });

    return {
        name: 'POST_user_add'
    }

};