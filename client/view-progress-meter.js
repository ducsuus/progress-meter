// View Progress Meter JavaScript

function drawStages(stages){

    var stagesContainer = document.getElementById('stage-container');

    var width = stagesContainer.offsetWidth;

    // Max 4 stages per row
    if (stages.length > 4){
        // The width of each stage, account margin around it
        var stageWidth = (width - (5 * 2 * 4)) / 4;
    } else{
        var stageWidth = (width - (5 * 2 * stages.length)) / stages.length;
    }

    var htmlString = '';

    for(var i = 0; i < stages.length; i++){
        if(stages[i]['complete'] == '1'){
            // Stage complete, display it so
            htmlString += '<div style=\'margin: 5px; width: ' + stageWidth + 'px;\' class=\'col-lg-4 col-sm-4 stage stage-complete\'><div class=\'stage-number\'>' + (i + 1) + '</div><div class=\'stage-title\'>' + stages[i]['title'] + '</div><br><div class=\'stage-content\'>' + stages[i]['information'] + '</div></div><div style=\'width: 10px;display: table-cell;\'></div>';
        }
        else{
            // Stage not complete, display it so
            htmlString += '<div style=\'margin: 5px; width: ' + stageWidth + 'px;\' class=\'col-lg-4 col-sm-4 stage stage-uncomplete\'><div class=\'stage-number\'>' + (i + 1) + '</div><div class=\'stage-title\'>' + stages[i]['title'] + '</div><br><div class=\'stage-content\'>' + stages[i]['information'] + '</div></div><div style=\'width: 10px;display: table-cell;\'></div>';            
        }

        //htmlString += '<div style=\'width: ' + stageWidth + ';\' class=\'progress\'>' + stages[i]['title'] + '<br>' + stages[i]['information'] + '</div>';            
        
    }

    stagesContainer.innerHTML = htmlString;

}

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

            drawStages(response);

        }
    }

    // Open the request
    xhr.open('GET', 'http://yrs.ducsuus.com/test/project/server/PHP/getstages.php?code=' + editCode, true);

    // Set out the POST headers (GET request)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // Send the request (nothing inside it)
    xhr.send(null);

}


//var editCode = prompt('Edit code :');
var editCode = 'CtsW';

getStages();