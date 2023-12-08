// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var searchResultsData 
var header = document.querySelector("#header");
let map, infoWindow;
var searchResultsEl = document.querySelector("#searchResults")

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  locationButton.classList.add("button");
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  header.appendChild(locationButton);
;
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          showGasStations(map)
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function showGasStations(map) {
  console.log(map)
  console.log(map.center.lat())
  var lat = map.center.lat()
  var lng = map.center.lng()
  var location = new google.maps.LatLng(lat, lng);
  const request = {
    keyword: "Gas Stations",
    fields: ["name", "geometry"],
    openNow: true,
    location,
    rankBy: google.maps.places.RankBy.DISTANCE
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    searchResultsData = results
    searchResultsEl.innerHTML = ""
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < 10; i++) {
        createMarker(results[i]);
        renderSearchResults2(results[i].name, "body", i)
        $(`#accordion-btn-num${i}`).on("click", function() {
          map.setCenter(results[i].geometry.location);
        })
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  console.log(place);
  if (!place.geometry || !place.geometry.location) return;
  const image =
    "./gas-station-red-icon.png";
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    icon: image
  });
  // a user clicks on a marker
  google.maps.event.addListener(marker, "click", () => {
    // the location of the place
    var position = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
    infoWindow.setPosition(position)
    // put the place name on the info window
    infoWindow.setContent(place.name || "");
    // show the info window
    infoWindow.open(map);
    console.log("clicked a pin")
  });
  
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// function renderSearchResults() {
//   var searchResult = document.createElement("div")
//   var accordionItem = document.createElement("div")
//   searchResult.classList.add("accordion")
//   accordionItem.classList.add("")

// }

function renderSearchResults2(name, body, i) {
  var html = `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          id="accordion-btn-num${i}"
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse${i}"
          aria-expanded="false"
          aria-controls="collapse${i}"
        >
          ${name}
        </button>
      </h2>
      <div
        id="collapse${i}"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          ${body}
        </div>
      </div>
    </div>
  `

  var accordianItemDiv = document.createElement('div')
  accordianItemDiv.innerHTML = html
  searchResultsEl.appendChild(accordianItemDiv)
  
}


window.initMap = initMap;
