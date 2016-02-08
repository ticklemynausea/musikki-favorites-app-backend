'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'GET',
        path: '/favorites',
        handler: controllers.Favorites.get
    });

};