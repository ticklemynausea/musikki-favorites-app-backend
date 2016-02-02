'use strict';

module.exports = function(sequelize, DataTypes) {

    var Artist = sequelize.define('Artist', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        apiId: {
            type: DataTypes.STRING,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {

        classMethods: {

            associate: function(models) {

                Artist.belongsToMany(models.User, {
                    as: 'users',
                    through: models.Favorite,
                    foreignKey: 'artist_id'
                });

            }

        }

    });

    return Artist;

};