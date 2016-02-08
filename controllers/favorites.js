'use strict';

module.exports = function(db) {

    var module = {

        name: 'Favorites',

        add: function(request, reply) {

            var API = require('../lib/API')();
            var g = require('../lib/util')().propGet;

            API.get('/artists/' + request.params.artist_id).then(function(response) {

                var response = JSON.parse(response);
                var result = response.result;

                db.Artist.findOrCreate({

                    where: {
                        id: result.mkid
                    },

                    defaults: {
                        name: g(result, 'name'),
                        image_url: g(result, 'image'),
                        country: g(result, 'location.current.country.name'),
                        start_date: g(result, 'dates.start.year'),
                        end_date: g(result, 'dates.end.year')
                    }

                }).spread(function(record, created) {

                    db.Favorite.create({
                        user_id: request.auth.credentials.id,
                        artist_id: record.id
                    }).then(function() {

                        reply({status: 'ok'});

                    }).catch(function(error) {

                        reply({status: 'ko'});
                        throw error;

                    });

                }).catch(function(error) {

                    reply({status: 'ko'});
                    throw error;

                });

            }).catch(function(error) {

                reply({status: 'ko'});
                throw error;

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

                reply({status: 'ko'});
                throw error;

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