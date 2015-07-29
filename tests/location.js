// Code to get the users location 

var d = new Date();
var startTime = d.getHours() + ':' + d.getMinutes();

console.log('Starting at: ' + startTime);

var coords = []

function setCookies(){
    var cookie = startTime + '::';

    for(var i = 0; i < coords.length; i++){
        cookie += coords[i][0].toString() + ',' + coords[i][1].toString() + ';';
    }

    console.log(cookie);

    var container = document.getElementById('location-container');

    container.innerHTML = cookie;
}

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
setCookies();

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