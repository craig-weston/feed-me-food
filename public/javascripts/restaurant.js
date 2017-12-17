/*-----------------------------------------------------------------------------------
            displays extra info below when restaurant is clicked
            -------------------------------------------------------------------------------------*/
function displayRestaurantInfo(place) {
    restaurant = place;
    console.log(restaurant.place_id)
    showTheForm();
    restaurantInfoDiv.style.display = "block";
    document.getElementById('name').textContent = place.name;
    document.getElementById('address').textContent = place.vicinity;
    document.getElementById('telephone').textContent = place.formatted_phone_number;
    if (place.website) {
        let website = hostnameRegexp.exec(place.website);
        if (website === null) {
            website = 'http://' + place.website + '/';
        }
        document.getElementById('website').innerHTML = '<a href="' + website + '">Visit Restaurant Website</a>';
    }

    let reviewsDiv = document.getElementById('reviews');
    let reviewHTML = '';
    reviewsDiv.innerHTML = reviewHTML;
    if (place.reviews) {
        if (place.reviews.length > 0) {
            for (let i = 0; i < place.reviews.length; i += 1) {
                let review = place.reviews[i];
                let avatar;
                if (place.reviews[i].profile_photo_url) {
                    avatar = place.reviews[i].profile_photo_url;
                } else {
                    avatar = '../images/avatar.png';
                }
                reviewHTML += `<div class="restaurant-reviews">
                                          <h3 class="review-title">
                                             <span class="profile-photo" style="background-image: url('${avatar}')"></span>`;
                if (place.rating) {
                    reviewHTML += `<span id="review-rating" class="rating">${starRating(review)}</span>`;
                }
                reviewHTML += ` </h3>
                                                <p> ${place.reviews[i].text} </p>
                                            </div>`;
                reviewsDiv.innerHTML = reviewHTML;
            }
        }
    }   }