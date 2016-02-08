'use strict';

module.exports = function() {

    var module = {

        name: 'API',

        get: function(url) {

            var http = require('request-promise');
            var env = process.env.NODE_ENV || 'development';
            var config = require('../config/config.json')[env];

            return http.get({
                url: config.api.musikki.url + url,
                headers: {
                    appid: config.api.musikki.appid,
                    appkey: config.api.musikki.appkey
                }
            });

        }


    };

    return module;

};