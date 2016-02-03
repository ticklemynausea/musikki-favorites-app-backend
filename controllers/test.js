'use strict';

module.exports = function(db) {

    var module = {

        name: 'Test',

        test: function(request, reply) {
            reply({ 'api' : 'ok' });
        },

    };

    return module;

}