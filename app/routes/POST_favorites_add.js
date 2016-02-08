'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'POST',
        path: '/favorites/add/{artist_id}',
        handler: controllers.Favorites.add
    });

};