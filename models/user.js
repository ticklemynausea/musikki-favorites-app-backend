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
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }

    }, {

        classMethods: {

            associate: function(models) {

                User.belongsToMany(models.Artist, {
                    through: models.Favorite,
                    foreignKey: 'user_id'
                });

            }

        }

    });

    return User;

};