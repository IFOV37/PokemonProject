function searchBadgeColor(id){
    $.ajax({
        url: '/badges/search/' + id,
        type: 'GET',
        data: $('#badge-color').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};