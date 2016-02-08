'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'POST',
        path: '/favorite/remove/{artist_id}',
        handler: controllers.Favorites.remove
    });

};