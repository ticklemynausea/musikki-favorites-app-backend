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

            var API = require('../lib/API')();
            var g = require('../lib/Util')().propGet;

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