'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'GET',
        path: '/artist/{artist}',
        handler: controllers.Artists.get
    });

};