// jquery ajax to update a specific badge's data in the Badges table

function updateBadge(id){
    $.ajax({
        url: '/badges/' + id,
        type: 'PUT',
        data: $('#update-badge').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};