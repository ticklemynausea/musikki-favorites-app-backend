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

                    /* give auth token */
                    var Auth = require('../lib/auth')();

                    var token = Auth.tokenSigner({
                        id: user.id,
                        username: user.username
                    });

                    reply({
                        status: "ok",
                        username: user.username,
                        auth_token: token,
                        message: "Welcome, " + user.username
                    })
                }

            });

        },

        logOut: function(request, reply) {

            reply({ status: "ok" });

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