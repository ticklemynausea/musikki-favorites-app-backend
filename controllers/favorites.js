'use strict';

module.exports = function(db) {

    var module = {

        name: 'Favorites',

        add: function(request, reply) {

            var API = require('../lib/API')();

            API.get('/artists/' + request.params.artist_id).then(function(response) {

                var response = JSON.parse(response);
                ///console.log(response)
                //reply(response)

                db.Artist.findOrCreate({
                    where: {
                        id: response.result.mkid
                    },
                    defaults: {
                        name: response.result.name,
                        image_url: response.result.image
                    }
                }).spread(function(record, created) {

                    db.Favorite.create({
                        user_id: request.auth.credentials.id,
                        artist_id: record.id,
                        artist_name: record.name,
                        image_url: record.image_url
                    }).then(function() {

                        reply({status: 'ok'});

                    }).catch(function(error) {

                        reply({status: 'ko', error: error});

                    });

                    //reply(record)

                }).catch(function(error) {

                    reply({status: 'ko', error: error});

                });

            }).catch(function(error) {

                reply({status: 'ko', error: error});

            });

        },

        remove: function(request, reply) {

            db.Favorite.destroy({

                where: {
                    user_id: request.auth.credentials.id,
                    artist_id: request.params.artist_id
                }

            }).then(function(rows_deleted) {

                if (rows_deleted > 0) {
                    reply({status:'ok'});
                } else {
                    reply({status:'ko'});
                }

            }).catch(function(error) {

                reply({status: 'ko', error: error});

            });

        },

        get: function(request, reply) {

            db.User.findOne({
                include: [ db.Artist ],
                where: {
                    id: request.auth.credentials.id,
                },
                order: '`Artists.Favorite`.`updatedAt` DESC',

            }).then(function(data) {

                reply(data.Artists);

            })
        }

    };

    return module;

}