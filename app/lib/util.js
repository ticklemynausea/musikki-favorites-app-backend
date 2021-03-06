module.exports = function(db) {

    var module = {

        propGet: function(obj, key) {

            return key.split(".").reduce(function(o, x) {
                return (typeof o == "undefined" || o === null) ? o : o[x];
            }, obj);

        }

    };

    return module;
};