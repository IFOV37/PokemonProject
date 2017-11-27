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

    /*Display all pokemon. Requires web based javascript to delete users with AJAX*/

    // displays all trainers in Trainers table
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


    // allows us to pass an id to the trainers page so we can navigate to the update-trainer page
    // to edit that specific trainer's data
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update-trainer.js"];
        var mysql = req.app.get('mysql');

        getTrainer(res, mysql, context, req.params.id, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-trainer', context);
            }

        }
    });

    // called with the jquery ajax is used in update-trainer.js
    // updates name and catchphrase for the trainer id passed, with the info passed
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Trainers SET name=?, catchphrase=? WHERE id=?";
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