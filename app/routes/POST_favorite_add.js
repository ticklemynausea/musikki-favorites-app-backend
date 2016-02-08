'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'POST',
        path: '/favorite/add/{artist_id}',
        handler: controllers.Favorites.add
    });

};