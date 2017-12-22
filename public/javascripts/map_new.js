function initMap() {
    let pos = {
        lat: 39.5696,
        lng: 2.6502
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 14,
        streetViewControl: false
    });


    initRestaurants(map);
}


function initRestaurants(map) {

    var restaurantDivs = document.getElementsByClassName('restaurant-info');

    for(var i=0; i < restaurantDivs.length; i++) {
        const restaurantDiv = restaurantDivs[i];
        const restaurant = JSON.parse(restaurantDiv.dataset.restaurant);
        showRestaurantInMap(restaurant);
    }




};

function showRestaurantInMap(restaurant) {

    var marker = new google.maps.Marker({
        position: restaurant.geometry.location,
        map: map
    });

    var infoWindow = generateInfoWindow(restaurant);
    var infoWindowBig = generateInfoWindowBig(restaurant);
    var openInfoWindow = () => {
        infoWindow.close();
        infoWindowBig.close();
        infoWindow.open(map, marker);
    };
    var closeInfoWindow = () => {
        infoWindow.close();
    };
    var openInfoWindowBig = () => {
        infoWindow.close();
        infoWindowBig.open(map, marker);
    };
    var closeInfoWindowBig = () => {
        infoWindow.close();
        infoWindowBig.close();
    };

    google.maps.event.addListener(marker, 'mouseover', openInfoWindow);
    google.maps.event.addListener(marker, 'mouseout', closeInfoWindow);
    google.maps.event.addListener(marker, 'click', openInfoWindowBig);
    google.maps.event.addListener(map, "click", closeInfoWindowBig);
    google.maps.event.addListener(marker, "touchstart", openInfoWindow);
    google.maps.event.addListener(marker, "touchend", closeInfoWindow);

}

function generateInfoWindow(restaurant) {
    return new google.maps.InfoWindow({
        content: buildIWContentSmall(restaurant)
    });
}
function generateInfoWindowBig(restaurant) {
    return new google.maps.InfoWindow({
        content: buildIWContentBig(restaurant)
    });
}

function buildIWContentSmall(restaurant) {
    return `
    <h6>${restaurant.name}</h6>
    `;

}

function buildIWContentBig(restaurant) {
    return `
    <div class="iw-icon"><img class="photo" src="${restaurant.icon}"/></div>
    <div class="url">
        <b><a href="/map/${restaurant.place_id}">${restaurant.name}</a></b>
    </div>
    <div class="iw-address">${restaurant.vicinity}</div>
    ${rating(restaurant)}
    
    `;

}
function phone(restaurant){
    if (restaurant.formatted_phone_number) {
        return `<div class="iw-phone">${restaurant.formatted_phone_number}</div>`;
    }
}

function rating(restaurant){
    if (restaurant.rating) {
        let ratingHtml = '';
        for (let i = 0; i < 5; i++) {
            if (restaurant.rating < (i + 0.5)) {
                ratingHtml += '&#10025;';
            } else {
                ratingHtml += '&#10029;';
            }
            return `<div class="iw-rating">${ratingHtml}</div>`;
        }
    }
}
