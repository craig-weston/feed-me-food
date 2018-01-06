navigator.geolocation.getCurrentPosition(function(position){
    sessionStorage.setItem("lat", position.coords.latitude);
    sessionStorage.setItem("lng", position.coords.longitude);
    $.post('/map', {
        lat: position.coords.latitude,
        lng: position.coords.longitude,

    });
}, function(err){console.log(err)});
