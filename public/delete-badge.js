function deleteBadge(id){
    $.ajax({
        url: '/badges/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};