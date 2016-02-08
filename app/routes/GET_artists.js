'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'GET',
        path: '/artists/{artist}',
        handler: controllers.Artists.get
    });

};