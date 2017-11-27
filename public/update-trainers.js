function updateTrainers(id){
    $.ajax({
        url: '/trainers/' + id,
        type: 'PUT',
        data: $('#update-trainers').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};