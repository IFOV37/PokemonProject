// jquery ajax to update a specific pokemon's data in the Pokemon table

function updatePokemon(id){
    $.ajax({
        url: '/pokemon/' + id,
        type: 'PUT',
        data: $('#update-pokemon').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

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