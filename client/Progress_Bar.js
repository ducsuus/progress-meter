
var inputstring = window.prompt("How many stages?","0");

function addDivs(){

	var divCount = parseInt(inputstring);
	var elementWidth = document.getElementById('progressdiv').offsetWidth;
	var distance = elementWidth/divCount; //Distance between stages

	console.log(elementWidth)

	var container = document.getElementById('progressdiv');
	var divHtml = '<div id="progressbar"><div id="progress-bar" class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"><span class="sr-only">70% Complete</span></div></div>';
	var i = 0;

	while(i < divCount){
		divHtml += '<div class="progresscircle" id="progresscircle' + i + '" style="right:' + (distance*i) + 'px;"><div class="info" id="infoid' + i + '"></div></div>';
		container.innerHTML = divHtml;
		console.log('index' + i);
		i++;
	}

}

function stageOne(){
	i=0
	while(i < 1){
		stagesstring = window.prompt('How many stages do you want it to cover?','0');
		stages = parseInt(stagesstring);
		divCount = parseInt(inputstring);
		if(stages <= divCount){
			i = 100;
		}else{
			window.alert('Please use a smaller number!');
		}
	}
	
		var progressbar = document.getElementById('progressbar');
		console.log(divCount);
		var elementWidth = progressbar.offsetWidth;
		console.log(elementWidth);
		var distance = (100/divCount)*stages;
		console.log(distance);
		var progress = document.getElementById('progress-bar');

		progress.style.width = distance+'%';
	
}

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

      	}

      var stageContainer = document.getElementById('stage-list');
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
                    } else {
                        stagecompletion = 'Yes';
                    }
                    stageContainer.innerHTML += '<div class="' + stageFormatting + '" style="width: ' + minWidth + '"><div class="small-form-label-black">Stage ' + (x + 1) + ' ' + stageTitle + '<br>' + stageInformation + '<br>Stage complete : ' + stageCompletion + '</div>';
                }
            }
        }
        // Open the request
    xhr.open('GET', 'http://yrs.ducsuus.com/test/project/server/PHP/getstages.php?code=' + 'jyrs', true);

    // Set out the POST headers (GET request)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // Send the request (nothing inside it)
    xhr.send(null);
    }

    


getStages();
