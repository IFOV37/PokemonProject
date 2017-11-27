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