// jquery ajax to update a specific badge's data in the Badges table

function addBadge(id){
    $.ajax({
        url: '/trainers/add-badge/' + id,
        type: 'PUT',
        data: $('#add-badge').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};