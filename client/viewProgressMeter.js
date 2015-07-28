// View Progress Meter JavaScript

// Function to go and update the stages on the page
function getStages(){

    // Create a new XML HTTP request
    var xhr = new XMLHttpRequest();

    // Define a callback function to be called when we have our JSON from the server
    xhr.onreadystatechange=function(){
        // Received a response from the server
        if (xhr.readyState==4 && xhr.status==200){
            console.log('Received a response: ' + xhr.responseText);

            // Decode the JSON response
            var response = JSON.parse(xhr.responseText);

            console.log(response);

            var stageContainer = document.getElementById('stage-list');

            stageContainer.innerHTML = 'dsadasdsadasdasd';

            for (var x = 0; x < response.length; x++){
                for (var property in response[x]){
                    stageContainer.innerHTML += ', ' + response[x][property];
                }
                stageContainer.innerHTML += '<br>';
            }
        }
    }

    // Open the request
    xhr.open('GET', '../server/PHP/getstages.php?code=' + viewCode, true);

    // Set out the POST headers (GET request)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // Send the request (nothing inside it)
    xhr.send(null);

}


var viewCode = prompt('View code (use jyrs if none): ');

getStages();