'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'POST',
        path: '/favorites/remove/{artist_id}',
        handler: controllers.Favorites.remove
    });

};