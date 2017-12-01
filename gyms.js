// gyms page

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // get all pokemon in pokemon table
    function getBadges(res, mysql, context, complete){
    	mysql.pool.query("SELECT id, name, color FROM Badges", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
            context.badges = results;
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

    // get all pokemon in pokemon table
    function getPokemon(res, mysql, context, complete){
    	mysql.pool.query("SELECT id, name, type, attack, trainer.id AS Trainer FROM Pokemon INNER JOIN trainer ON trainer.id = pokemon.trainerID", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
            context.pokemon = results;
            complete();
    	});
    }

    // get all gyms in Gyms table
    function getGyms(res, mysql, context, complete){
    	mysql.pool.query("SELECT Gyms.id, Gyms.name, t.name AS GymLeader, b.name AS GymBadge FROM Gyms INNER JOIN Trainers t ON t.id = Gyms.trainerID INNER JOIN Badges b ON b.id = Gyms.badgeID", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
            context.gyms = results;
            complete();
    	});
    }

    function getGym(res, mysql, context, id, complete){
        var sql = "SELECT Gyms.id, Gyms.name, Trainers.name AS 'leader', Badges.name AS 'badge' FROM Gyms INNER JOIN Trainers ON Trainers.id = Gyms.trainerID INNER JOIN Badges ON Badges.id = Gyms.badgeID WHERE Gyms.id = ?";
        var inserts = [Gyms.id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.gym = results[0];
            complete();
        });
    }


    /*Display all pokemon. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-gym.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        var mysql = req.app.get('mysql');

        //getBadges(res, mysql, context, complete);
        //getTrainers(res, mysql, context, complete);
        //getPokemon(res, mysql, context, complete);
        getGyms(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('gyms', context);
            }
        }
    });


    // allows us to pass an id to the gym page so we can navigate to the update-gym page
    // to edit that specific gym's data
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update-gym.js"];
        var mysql = req.app.get('mysql');

        getGym(res, mysql, context, req.params.id, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-gym', context);
            }

        }
    });

    // called with the jquery ajax is used in update-trainer.js
    // updates name and catchphrase for the trainer id passed, with the info passed
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Gyms SET name=? WHERE id=?";
        var inserts = [req.body.name, req.params.id];
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

    /* Route to delete a gym, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Gyms WHERE id = ?";
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
