module.exports = function(db) {

    var module = {

        tokenValidator: function(decoded, request, callback) {

            // TODO: validate token properly
            if (!decoded.id) {
                return callback(null, false);
            }
            else {
                return callback(null, true);
            }

        },

        tokenSigner: function(obj) {

            var jwt = require('jsonwebtoken');
            var env = process.env.NODE_ENV || 'development';
            var config = require('../config/config.json')[env];
            var token = jwt.sign(obj, config.auth.key);

            return token;

        }

    };

    return module;
}