'use strict';

module.exports = function(db) {

    var module = {

        name: 'Artists',

        get: function(request, reply) {

            var getFavorites = function(user_id, artists) {

                var favorite_ids = artists.map(function(obj) {
                    return obj.id;
                });

                return db.Favorite.findAll({
                    where: {
                        user_id: user_id,
                        artist_id: favorite_ids
                    }
                });

            }

            //TODO: mix with data from our favorites

            var http = require('request-promise');
            var env = process.env.NODE_ENV || 'development';
            var config = require('../config/config.json')[env];

            http.get({
                url: config.api.musikki.url + config.api.musikki.endpoints.artist_search.replace('{q}', request.params.artist),
                headers: {
                    appid: config.api.musikki.appid,
                    appkey: config.api.musikki.appkey
                }
            }).then(function(response) {

                var response = JSON.parse(response);
                var artists = [];

                response.results.forEach(function(obj) {

                    artists.push({
                        'id': String(obj.mkid),
                        'name': obj.name
                    });

                });

                getFavorites(request.auth.credentials.id, artists).then(function(favorites) {

                    var favorite_ids = favorites.map(function(favorite) {
                        return favorite.artist_id;
                    });

                    var artists_with_favorites = artists.forEach(function(artist) {
                        artist.favorite = (favorite_ids.indexOf(artist.id) !== -1);
                        return artist;
                    })

                    reply(artists);

                })
            }).catch(function(error) {
                reply({status: 'ko', error: error});
            });

        }
    }

    return module;

}