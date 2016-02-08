'use strict';

module.exports = {

    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('Users', [
            {
                username: 'mario',
                password: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
                email: 'emailoftheyear@gmail.com'
            },
            {
                username: 'joao',
                password: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
                email: 'igotbugs@ticklemynausea.net'
            },
            {
                username: 'pedro',
                password: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
                email: 'pedro@gmail.com'
            }
        ], {});

    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('Users', null, {});

    }

};