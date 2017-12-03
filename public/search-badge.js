function searchBadgeColor(color){
    $.ajax({
        url: '/badges/search/' + color,
        type: 'GET',
        data: $('#badge-color').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};