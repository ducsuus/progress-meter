/*
Tracking code
*/
// Code to get the users location 

var d = new Date();
var startTime = d.getHours() + ':' + d.getMinutes();

console.log('Starting at: ' + startTime);

var coords = []

/* Get the users location */
function getLocation(){
    // Not that this function will not work on not HTTPS websites soon! Let's get a SSL cert!

    // If we have HTML5 Geolocation /* Windows, Mac, iOS, Android */
    if (navigator.geolocation){

        // Get our position, provide a callback function to use

        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            console.log("Lat: " + lat);
            console.log("Lng: " + lng);

            coords.push([lat, lng]);

            setCookies();
        })

    }
}

getLocation();

console.log('dsadsa');

setInterval(getLocation, 1000 * 60);

window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }

    // For Safari
    return 'Sure?';
};

/*
Google maps 
*/

var rendererOptions = {
    draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;
            
//Defines the location 
var userLocation  = new google.maps.LatLng();
            
// First function called that starts the map up
function initialize() {
    // Array that stores the map options 
    var mapOptions = {
    // Sets zoom level
    zoom: 7,
    // Sets the map center
    center: userLocation 
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
    });
                    
    // Calls calcRoute
    calcRoute();
}
            
// Calculates the route
function calcRoute() {
    var startingPoint = "Eastbourne, BN21"; //TODO replace with data from database
    var endingPoint = "Eastbourne, BN21"; //TODO replace with data from database
    /*var userWaypoints={location: 'Eastbourne, BN21'}, 
        {location: 'Eastbourne, BN21'},
        {location: 'Eastbourne, BN21'};*/
    // Array called request
    var request = {
        //Starting point
        origin: startingPoint,
        //Finishing point
        destination: endingPoint,
        //Makes it display the shortest route
        optimizeWaypoints: true,
        //Stops in between
        waypoints:[{location: 'Eastbourne, BN20'}, 
            {location: 'Eastbourne, BN22'},
            {location: 'Eastbourne, BN21'}],
            //Method of transportation 
            travelMode: google.maps.TravelMode.DRIVING
    };
                
    // Don't know what this does
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}
            
// Calculates the total distance
function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
                
    // Converts meters into kilometers 
    total = total / 1000.0;
                
    // Updates the elements on screen 
    document.getElementById('total').innerHTML = total + ' km';
}
            