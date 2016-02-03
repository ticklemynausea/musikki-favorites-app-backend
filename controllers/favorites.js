'use strict';

module.exports = function(db) {

    var module = {

        name: 'Favorites',

        add: function(request, reply) {

            db.Favorite.create({
                user_id: request.auth.credentials.id,
                artist_id: request.params.artist_id
            }).then(function() {

                reply({status:"ok"});

            }).catch(function() {

                reply({status:"ko"});

            });

        },

        remove: function(request, reply) {

            db.Favorite.destroy({
                where: {
                    user_id: request.auth.credentials.id,
                    artist_id: request.params.artist_id
                }
            }).then(function(what) {

                if (rows_deleted > 0) {
                    reply({status:"ok"});
                } else {
                    reply({status:"ko"});
                }

            }).catch(function(error) {

                reply({status:"ko"});

            });

        }

    };

    return module;

}