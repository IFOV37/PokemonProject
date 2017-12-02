// trainers page

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // get all trainers in Trainers table
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

    // returns a single trainer where the user selected the update link (on the id)
    function getTrainer(res, mysql, context, id, complete){
        var sql = "SELECT id, name, catchphrase FROM Trainers WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.trainer = results[0];
            complete();
        });
    }

    // get all pokemon in pokemon table
    function getTrainersBadges(res, mysql, context, id, complete){
        var sql = "SELECT b.id, b.name FROM Badges b INNER JOIN Trainer_Badge tb ON b.ID = tb.badgeID WHERE tb.trainerID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.badgesOwned = results;
            complete();
        });
    }

    // get all pokemon in pokemon table
    function getBadgesNotOwned(res, mysql, context, complete){
        //var sql = "SELECT b.id, b.name FROM Badges b RIGHT JOIN Trainer_Badge tb ON b.ID = tb.badgeID WHERE tb.trainerID <> ";
        //var sql = "SELECT Badges.id, Badges.name FROM Badges WHERE Badges.name NOT IN (SELECT b.name FROM Badges b INNER JOIN Trainer_Badge tb ON tb.badgeID = b.id WHERE tb.trainerID = ?) ORDER BY Badges.id ASC";
        //var sql = "SELECT DISTINCT b.id, tb.trainerID FROM Badges b LEFT JOIN Trainer_Badge tb ON tb.badgeID = b.id WHERE id NOT IN (SELECT b.id FROM Badges b INNER JOIN Trainer_Badge tb ON tb.badgeID = b.id INNER JOIN Trainers t ON t.id = tb.trainerID)";
        //var inserts = [id];
        mysql.pool.query("SELECT id, name FROM Badges ORDER BY id ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.badgesNotOwned = results;
            complete();
        });
    }

    /*Display all pokemon. Requires web based javascript to delete users with AJAX*/

    // displays all trainers in Trainers table
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-trainer.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        var mysql = req.app.get('mysql');

        getTrainers(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('trainers', context);
            }
        }
    });

    /* Adds a trainer, redirects to the trainers page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Trainers (name, catchphrase) VALUES (?,?)";
        var inserts = [req.body.name, req.body.catchphrase];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/trainers');
            }
        });
    });

    router.get('/add-badge/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["add-badge.js"];
        var mysql = req.app.get('mysql');

        getTrainer(res, mysql, context, req.params.id, complete);
        getTrainersBadges(res, mysql, context, req.params.id, complete);
        getBadgesNotOwned(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('add-badge', context);
            }
        }
    });

    // allows us to pass an id to the trainers page so we can navigate to the update-trainer page
    // to edit that specific trainer's data
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update-trainer.js"];
        var mysql = req.app.get('mysql');

        getTrainer(res, mysql, context, req.params.id, complete);
        getTrainersBadges(res, mysql, context, req.params.id, complete);
        getBadgesNotOwned(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-trainer', context);
            }
        }
    });



    router.post('/trainers/add-badge/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Trainer_Badge (trainerID, badgeID) VALUES (?,?)";
        var inserts = [req.body.trainerID, req.body.badge];
        console.log(req.body.trainerID);
        console.log(req.body.badge);
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/trainers/add-badge');
                //res.status(200);
                //res.end();
            }
        });
    });

    // called with the jquery ajax is used in update-trainer.js
    // updates name and catchphrase for the trainer id passed, with the info passed
    router.put('/update/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Trainers SET name=?, catchphrase=?, WHERE id=?";
        var inserts = [req.body.name, req.body.catchphrase, req.params.id];
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
        var sql = "DELETE FROM Trainers WHERE id = ?";
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
