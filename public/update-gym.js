// jquery ajax to update a specific trainer's data in the Trainers table

function updateGym(id){
    $.ajax({
        url: '/gyms/' + id,
        type: 'PUT',
        data: $('#update-gym').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};