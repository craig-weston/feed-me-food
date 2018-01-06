navigator.geolocation.getCurrentPosition(function(position){
    localStorage.setItem("lat", position.coords.latitude);
    localStorage.setItem("lng", position.coords.longitude);
    console.log('geolocate')
    $.post('/map', {
        lat: position.coords.latitude,
        lng: position.coords.longitude,

    });
}, function(err){console.log(err)});
console.log('ok')