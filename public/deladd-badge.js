function deleteBadge(bid, tid){
    $.ajax({
        url: '/trainers/deleteBadge/' + bid + '/' + tid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};