'use strict';

module.exports = function(db) {

    var module = {

        name: 'Users',

        logIn: function(request, reply) {

            if (request.auth.isAuthenticated) {
                return reply.redirect('/');
            }

            var sha1 = require('sha1');

            db.User.findOne({

                where: {
                    username: request.payload.username,
                    password: sha1(request.payload.password)
                }

            }).then(function(user) {

                if (user === null) {

                    reply({
                        status: "ko"
                    });

                } else {

                    /* set auth header */
                    /** TODO: refactor this out of here */
                    var jwt = require('jsonwebtoken');
                    var env = process.env.NODE_ENV || 'development';
                    var config = require('../config/config.json')[env];
                    var obj = {
                        id: user.id,
                        username: user.username
                    }
                    var token = jwt.sign(obj, config.auth.key);


                    reply({
                        status: "ok",
                        auth_token: token,
                        message: "Welcome, " + user.username
                    })
                }
            });


        },

        logOut: function(request, reply) {

        },

        getUsers: function(request, reply) {

        },

        addUser: function(request, reply) {

            var sha1 = require('sha1');

            db.User.create({
                username: request.payload.username,
                password: sha1(request.payload.password)
            }).then(function() {

                reply(request.payload);

            }).catch(function() {

                reply({status:"ko"});

            });

        }
    };

    return module;

}