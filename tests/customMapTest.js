var rendererOptions = {
                draggable: true
            };
            var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
            var directionsService = new google.maps.DirectionsService();
            var map;
            
            //Defines the location 
            var australia  = new google.maps.LatLng(-25.274398, 133.775136);
            
            // First function called that starts the map up
            function initialize() {
                // Array that stores the map options 
                var mapOptions = {
                    // Sets zoom level
                    zoom: 7,
                    // Sets the map center
                    center: australia 
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
                // Array called request
                var request = {
                    //Starting point
                    origin: 'Sydney, NSW',
                    //Finishing point
                    destination: 'Melbourne, NSW',
                    //Stops in between
                    waypoints:[{location: 'Bourke, NSW'}, 
                               {location: 'Broken Hill, NSW'},
                               {location: 'Albert, NSW'}
                              ],
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
            