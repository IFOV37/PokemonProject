function deleteBadge(bid, tid){
    $.ajax({
        url: '/deleteBadge/' + bid + '/' + tid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};