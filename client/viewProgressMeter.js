// View Progress Meter JavaScript

// Function to go and update the stages on the page
function getStages(){

    // Create a new XML HTTP request
    var xhr = new XMLHttpRequest();

    // Define a callback function to be called when we have our JSON from the server
    xhr.onreadystatechange=function() {
        // Received a response from the server
        if (xhr.readyState==4 && xhr.status==200) {
            console.log('Received a response: ' + xhr.responseText);

            // Decode the JSON response
            var response = JSON.parse(xhr.responseText);

            console.log(response);

            var stageContainer = document.getElementById('stage-list');
            var stageContainerWidth = document.getElementById('stage-list').offsetWidth;
            var minWidth = stageContainerWidth/6;
            var possWidth = stageContainerWidth/response.length;
            var stageFormatting = 'Progress'

            if (stageContainerWidth/response.length >= minWidth) {
                for (var x = 0; x < response.length; x++){
                
                    stageTitle = response[x]['title'];
                    stageInformation = response[x]['information'];
                    stageCompletion = response[x]['complete'];
                    if (stageCompletion == '0') {
                        stageCompletion = 'No';
                        stageFormatting = 'progress';
                        console.log('Formatting is now : ' + stageFormatting);
                    } else {
                        stageCompletion = 'Yes';
                        stageFormatting = 'stage-complete';
                        console.log('Formatting is now : ' + stageFormatting);
                    }
                    stageContainer.innerHTML += '<div class="' + stageFormatting + '" style="width: ' + possWidth + '"><div class="small-form-label-black">Stage ' + (x + 1) + ' ' + stageTitle + '<br>' + stageInformation + '<br>Stage complete : ' + stageCompletion + '</div>';
                }
            } else {
                for (var x = 0; x < response.length; x++) {
                    stageTitle = response[x]['title'];
                    stageInformation = response[x]['information'];
                    stageCompletion = response[x]['complete'];
                    if (stageCompletion == 0) {
                        stageCompletion = 'No';
                        stageFormatting = 'progress';
                    } else {
                        stagecompletion = 'Yes';
                        stageFormatting = 'stage-complete'
                    }
                    stageContainer.innerHTML += '<div class="' + stageFormatting + '" style="width: ' + minWidth + '"><div class="small-form-label-black">Stage ' + (x + 1) + ' ' + stageTitle + '<br>' + stageInformation + '<br>Stage complete : ' + stageCompletion + '</div>';
                }
            }
        }
    }

    // Open the request
    xhr.open('GET', 'http://yrs.ducsuus.com/test/project/server/PHP/getstages.php?code=' + viewCode, true);

    // Set out the POST headers (GET request)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // Send the request (nothing inside it)
    xhr.send(null);

}


var viewCode = prompt('View code (use jyrs if none): ');

getStages();