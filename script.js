
//DEPENDENCIES (DOM Elements or Server Packages)
    // var placesApi = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCF4H0RZ-2IdsEooyswERhgPvkGBXVZF6QY&libraries=places&callback=initMap';

//DATA (Global Variables or Imported Data)


//FUNCTIONS (Helper Functions)
    function initMap() {
  
        fetch('https://maps.googleapis.com/maps/api/js?key=AIzaSyCF4H0RZ-2IdsEooyswERhgPvkGBXVZF6Q&libraries=places&callback=initMap')
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then (function(data) {
            console.log(data);
        });
    }






//USER INTERACTIONS

//INITIALIZATION
    initMap();

