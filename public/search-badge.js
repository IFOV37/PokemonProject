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

function searchbadge(){
    var colorId = document.getElementById("badgeSearch");
    console.log(colorId);

    var color = colorId.options[colorId.selectedIndex].text;
    console.log(colorId);


/*
    $.ajax({
        url: '/badges/search/' + color,
        type: 'GET',
        data: $('#badge-color').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
    */
};