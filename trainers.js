// trainers page

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // get all pokemon in pokemon table
    function getTrainers(res, mysql, context, complete){
    	mysql.pool.query("SELECT id, name, catchphrase FROM Trainers", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
            context.trainers = results;
            copmlete();
    	});
    }

    /*Display all pokemon. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deletepokemon.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        var mysql = req.app.get('mysql');

        getTrainers(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('trainers', context);
            }
        }
    });



    return router;
}();