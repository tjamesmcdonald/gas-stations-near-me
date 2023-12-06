
// DEPENDENCIES (DOM Elements or Server Packages)
var placesApi = 'https://places.googleapis.com/v1/places/GyuEmsRBfy61i59si0?fields=addressComponents&key=AIzaSyCF4H0RZ-2IdsEooyswERhgPvkGBXVZF6Q';


// DATA (Global Variables or Imported Data)




// FUNCTIONS (Helper Functions)
function getApi(placesApi) {
  
    fetch(placesApi)
      .then(function (response) {
      console.log(response);
     
      return response.json();
    });
  }



// USER INTERACTIONS






// INITIALIZATION
getApi(placesApi);

