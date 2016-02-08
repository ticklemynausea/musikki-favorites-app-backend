'use strict';

module.exports = {

    up: function (queryInterface, Sequelize) {

        return queryInterface.createTable('Artists', {

            id: {
                type: Sequelize.STRING,
                primaryKey: true,
            },

            name: {
                type: Sequelize.STRING
            },

            image_url: {
                type: Sequelize.STRING
            },

            country: {
                type: Sequelize.STRING
            },

            start_date: {
                type: Sequelize.STRING
            },

            end_date: {
                type: Sequelize.STRING
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

        });

    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.dropTable('Artists');

    }

};
