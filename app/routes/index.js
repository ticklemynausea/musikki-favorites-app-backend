'use strict';

module.exports = function(server, controllers) {

    var fs = require('fs');
    var path      = require('path');
    var basename  = path.basename(module.filename);

    var modules = {};

    fs
      .readdirSync(__dirname)
      .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(function(file) {
        /* no value returned */
        var module = require(path.join(__dirname, file))(server, controllers);
        modules[file.slice(0, -3)] = module;
      });

    return modules;

};