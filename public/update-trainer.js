// jquery ajax to update a specific trainer's data in the Trainers table

function updateTrainer(id){
    $.ajax({
        url: '/trainers/' + id,
        type: 'PUT',
        data: $('#update-trainer').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};