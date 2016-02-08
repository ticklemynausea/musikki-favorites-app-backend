'use strict';

module.exports = function(db) {

    var module = {

        name: 'Artists',

        get: function(request, reply) {

            /* markUserFavoriteArtists
             * in: user_id, a user's id
             * in artists: a list of artists
             * out: a promise that returns the given artists list with favorite attribute
             */
            var markUserFavoriteArtists = function(user_id, artists) {

                return new Promise(function(resolve, reject) {

                    var artist_ids = artists.map(function(artist) {
                        return artist.id;
                    });

                    db.Favorite.findAll({
                        attributes: [ 'artist_id' ],
                        where: {
                            user_id: user_id,
                            artist_id: artist_ids
                        }
                    }).then(function(favorites) {

                        var favorite_ids = favorites.map(function(favorite) {
                            return favorite.artist_id;
                        });

                        var artists_with_favorites = artists.map(function(artist) {
                            artist.favorite = (favorite_ids.indexOf(artist.id) !== -1);
                            return artist;
                        })

                        resolve(artists_with_favorites);

                    });

                });

            }

            var API = require('../lib/API')();
            var g = require('../lib/util')().propGet;

            API.get('/artists?q=' + request.params.artist).then(function(response) {

                var response = JSON.parse(response);
                var artists = [];

                response.results.forEach(function(result) {

                    artists.push({
                        id: String(result.mkid),
                        name: g(result, 'name'),
                        image_url: g(result, 'image'),
                        country: g(result, 'location.current.country.name'),
                        start_date: g(result, 'dates.start.year'),
                        end_date: g(result, 'dates.end.year')
                    });

                });

                markUserFavoriteArtists(request.auth.credentials.id, artists).then(function(artists_with_favorites) {
                    reply(artists_with_favorites);
                })

            }).catch(function(error) {
                reply({status: 'ko'}).code(500);
                throw error;
            });

        }
    }

    return module;

}