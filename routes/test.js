'use strict';

module.exports = function(server, controllers) {

    server.route({
        method: 'GET',
        path: '/api',
        handler: controllers.Test.test
    });

    return {
        name: 'GET_test'
    }

};