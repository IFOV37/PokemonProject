// trainers page

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // get all pokemon in pokemon table
    function getTrainersBadges(res, mysql, context, complete){
    	mysql.pool.query("SELECT t.name, b.name AS 'badge' FROM Trainer_Badge tb INNER JOIN Trainers t ON t.ID = tb.trainerID INNER JOIN Badges b ON b.ID = tb.badgeID", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
            context.tb = results;
            copmlete();
    	});
    }

    /*Display all pokemon. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deletepokemon.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        var mysql = req.app.get('mysql');

        getTrainersBadges(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('trainers-badges', context);
            }
        }
    });



    return router;
}();