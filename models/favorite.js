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
            allowNull: false,
            unique: 'favorite_unique'
        },

        artist_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'favorite_unique'
        }

    }, {

        classMethods: {

            associate: function(models) {

            }

        }

    });





    return Favorite;

};