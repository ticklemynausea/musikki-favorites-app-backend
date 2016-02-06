'use strict';

module.exports = function(sequelize, DataTypes) {

    var Artist = sequelize.define('Artist', {

        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING
        },

        image_url: {
            type: DataTypes.STRING
        }

    }, {

        classMethods: {

            associate: function(models) {

                Artist.belongsToMany(models.User, {
                    through: models.Favorite,
                    foreignKey: 'artist_id'
                });

            }

        }

    });

    return Artist;

};