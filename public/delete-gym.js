function deleteGym(id){
    $.ajax({
        url: '/gyms/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};