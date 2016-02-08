'use strict';

module.exports = {

    up: function (queryInterface, Sequelize) {

        return [

            queryInterface.createTable('Favorites', {

                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },

                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id'
                    }
                },

                artist_id: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    references: {
                        model: 'Artists',
                        key: 'id'
                    }
                },

                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },

                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                }

            }),

            queryInterface.addIndex(
                'Favorites',
                ['user_id', 'artist_id'],
                {
                    indexName: 'favorite_unique',
                    indicesType: 'UNIQUE'
                }
            )

        ];

    },

    down: function (queryInterface, Sequelize) {

        return [

            queryInterface.dropTable('Favorites'),

            queryInterface.removeIndex(
                'Favorites',
                ['user_id', 'artist_id']
            )

        ];

    }
};
