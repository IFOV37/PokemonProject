// badges page

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // get all badges in Badges table
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

     // returns a single badge where the user selected the update link (on the id)
    function getBadge(res, mysql, context, id, complete){
    	var sql = "SELECT id, name, color FROM Badges WHERE id=?";
    	var inserts = [id];
    	mysql.pool.query(sql, inserts, function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
            context.badge = results[0];
            complete();
    	});
    }

    function getBadgeColor(res, mysql, context, color, complete){
        var sql = "SELECT id, name, color FROM Badges WHERE color LIKE ?";
        var inserts = [color];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.badges = results;
            complete();
        });
    }


    /*Display all pokemon. Requires web based javascript to delete users with AJAX*/

    // displays all badges in Badges table
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-badge.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        var mysql = req.app.get('mysql');

        getBadges(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('badges', context);
            }
        }
    });

    router.get('/search', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["search-badge.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        var mysql = req.app.get('mysql');

        getBadges(res, mysql, context, complete);
        getBadgeColor(res, mysql, context, color, complete)

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('badge-search', context);
            }
        }
    });

        /* Adds a badge, redirects to the badge page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Badges (name, color) VALUES (?,?)";
        var inserts = [req.body.name, req.body.color];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/badges');
            }
        });
    });
/*
    router.get('/search', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["delete-badge.js"]  // we need to pass our script/function if we want to actually be able to delete a pokemon  review if we want to later
        var mysql = req.app.get('mysql');

        //getBadge(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('badges', context);
            }
        }
    });
    */
    router.get('/search/:color', function(req, res){
        callbackCount = 0;
        var context = {};
        //context.jsscripts = ["update-badge.js"];
        var mysql = req.app.get('mysql');
        console.log(req.params);
        getBadgeColor(res, mysql, context, req.params.color, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('badge-search', context);
            }
        }
    });


    router.post('/search', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "SELECT name, color FROM Badges WHERE id = ?";
        var inserts = [req.body.badgeColor];
        console.log(req.body);
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //res.redirect('/badges/search');
                console.log(results);
                res.render('/badges', results);
            }
        });
    });

    router.put('/search/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Badges SET name=?, color=? WHERE id=?";
        var inserts = [req.body.name, req.body.color, req.params.id];
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



    // allows us to pass an id to the badges page so we can navigate to the update-badge page
    // to edit that specific badge's data
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update-badge.js"];
        var mysql = req.app.get('mysql');

        getBadge(res, mysql, context, req.params.id, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-badge', context);
            }

        }
    });

    // called with the jquery ajax is used in update-badge.js
    // updates name and catchphrase for the badge id passed, with the info passed
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Badges SET name=?, color=? WHERE id=?";
        var inserts = [req.body.name, req.body.color, req.params.id];
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


    /* Route to delete a badge, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Badges WHERE id = ?";
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