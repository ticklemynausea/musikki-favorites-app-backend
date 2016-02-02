'use strict';

module.exports = function(sequelize, DataTypes) {

    var Favorite = sequelize.define('Favorite', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        artist_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {

        classMethods: {

            associate: function(models) {

            }

        }

    });





    return Favorite;

};