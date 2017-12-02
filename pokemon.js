// pokemon page

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // get all pokemon in pokemon table
    function getPokemon(res, mysql, context, complete){
    	mysql.pool.query("SELECT Pokemon.id, Pokemon.name, type, attack, Trainers.name AS Trainer FROM Pokemon LEFT JOIN Trainers ON Trainers.id = Pokemon.trainerID", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
            context.pokemon = results;
            complete();
    	});
    }

    // get single pokemon by id
    function getSinglePokemon(res, mysql, context, id, complete){

        var sql = "SELECT p.id, p.name, p.type, p.attack, t.name AS 'Trainer' FROM Pokemon p LEFT JOIN Trainers t ON t.id = p.trainerID WHERE p.id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pokemon = results[0];
            complete();
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
            complete();
        });
    }



    /*Display all pokemon. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-pokemon.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        var mysql = req.app.get('mysql');

        getPokemon(res, mysql, context, complete);
        //getTrainers(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('pokemon', context);
            }
        }
    });


    // allows us to pass an id to the pokemon page so we can navigate to the update-pokemon page
    // to edit that specific pokemon's data
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update-pokemon.js"];
        var mysql = req.app.get('mysql');

        getSinglePokemon(res, mysql, context, req.params.id, complete);
        getTrainers(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
            	console.log(context);
                res.render('update-pokemon', context);
            }

        }
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Pokemon (name, type, attack) VALUES (?,?,?)";
        var inserts = [req.body.name, req.body.type, req.body.attack, req.body.trainer];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/pokemon');
            }
        });
    });


    // called with the jquery ajax is used in update-pokemon.js
    // updates name, type, and attack for the pokemon id passed, with the info passed
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Pokemon SET name=?, type=?, attack=?, trainerID=? WHERE id=?";
        var inserts = [req.body.name, req.body.type, req.body.attack, 10, req.params.id];
        console.log(req.body);
	console.log(req.body.Trainer);
	console.log(req.params.id);
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Pokemon WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })


    return router;
}();


// git push new branch stuff

// https://forum.freecodecamp.org/t/push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too/13222
