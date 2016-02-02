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
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {

        classMethods: {

            associate: function(models) {

                User.belongsToMany(models.Artist, {
                    as: 'artist',
                    through: models.Favorite,
                    foreignKey: 'user_id'
                });

            }

        }

    });

    return User;

};