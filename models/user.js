'use strict';

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('User', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {

        classMethods: {

            associate: function(models) {

                User.hasMany(models.Favorite, {
                    foreignKey: 'user_id'
                });

            }

        }

    });

    return User;

};