'use strict';

module.exports = function(db) {

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
        var module = require(path.join(__dirname, file))(db);
        modules[module.name] = module;
      });

    return modules;

};