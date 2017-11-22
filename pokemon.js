// pokemon page

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // get all pokemon in pokemon table
    function getPokemon(res, mysql, context, complete){
    	mysql.pool.query("SELECT id, name, type, attack, trainer.id AS Trainer FROM Pokemon INNER JOIN trainer ON trainer.id = pokemon.trainerID", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
            context.pokemon = results;
            copmlete();
    	});
    }

    // get all trainers in the trainer table
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
        context.jsscripts = ["deletepokemon.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        var mysql = req.app.get('mysql');

        getPokemon(res, mysql, context, complete);
        getTrainers(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('pokemon', context);
            }
        }
    });



    return router;
}();


// git push new branch stuff

// https://forum.freecodecamp.org/t/push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too/13222