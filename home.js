// landing page js file, if required.

module.exports = function(){
    var express = require('express');
    var router = express.Router();


    router.get('/', function(req, res){
        //var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deletepokemon.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        /*var mysql = req.app.get('mysql');

        getTrainers(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){ */
                res.render('home', context);
    /*        }
        }*/
    });

    return router;
}();