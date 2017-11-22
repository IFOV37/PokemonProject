// pokemon page

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPokemon(res, mysql, context, complete){
    	mysql.pool.query("SELECT id, name, type, attack, trainer.id AS Trainer FROM Pokemon INNER JOIN trainer ON trainer.id = pokemon.trainerID", function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
    	})
    }


    return router;
}();