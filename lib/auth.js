module.exports = function() {

    var module = {

        requestValidationFunction: function(request, session, callback) {
            console.log("IN VALIDATION FUNCTION");
            console.log(request);
            // call callback
        }

    };

    return module;
}