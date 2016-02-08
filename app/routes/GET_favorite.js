'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'GET',
        path: '/favorite',
        handler: controllers.Favorites.get
    });

};