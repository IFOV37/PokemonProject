function deleteTrainer(id){
    $.ajax({
        url: '/trainers/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};