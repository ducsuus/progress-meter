function addDivs(responsed){

	var divCount = responsed.length;
	console.log(responsed);
	var progressbardiv = document.getElementById('progressdiv');
	var elementWidth = progressbardiv.offsetWidth;
	var distance = elementWidth/divCount; //Distance between stages

	console.log(elementWidth)

	var container = document.getElementById('progressdiv');
	var divHtml = '<div id="progressbar"><div id="progress-bar" class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"><span class="sr-only">70% Complete</span></div></div>';
	var i = 0;

	while(i < divCount){
		divHtml += '<div class="progresscircle" id="progresscircle' + i + '" style="right:' + (distance*i) + 'px;"><div class="info"><h1 class="info_header" id="infoh'+ i +'"></h1><p class="infop" id="infoid' + i + '"></p></div></div>';
		container.innerHTML = divHtml;
		console.log('index' + i);
		i++;
	}
	drawStages(responsed);
}

function stageOne(){
	i=0
	while(i < 1){
		stagesstring = window.prompt('How many stages do you want it to cover?','0');
		if(stages <= 6){
			i = 100;
		}else{
			window.alert('Please use a smaller number!');
		}
	}
	
		var progressbar = document.getElementById('progressbar');
		console.log(divCount);
		var elementWidth = progressbar.offsetWidth;
		console.log(elementWidth);
		var distance = (100/6)*stages;
		console.log(distance);
		var progress = document.getElementById('progress-bar');

		progress.style.width = distance+'%';
	
}


function drawStages(stages){
	console.log('Activated drawStages function');
	var div = document.getElementById('progressdiv');
	for(var i = 0; i < stages.length; i++){
		if(stages[i]['complete']=='1'){
			var para = document.getElementById('infoid'+i);
			var head = document.getElementById('infoh'+i);
			head.innerHTML = stages[i]['title'];
			para.innerHTML += stages[i]['information'];
			para.innerHTML += 'Complete';
		}else{
			var para = document.getElementById('infoid'+i);
			para.innerHTML = stages[i]['title'];
			para.innerHTML += stages[i]['information'];
			para.innerHTML += 'Not Complete';
		}
	}
}
// View Progress Meter JavaScript
var response = '';
// Function to go and update the stages on the page
function getStages(){

	console.log("Get Stages Loaded");
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

            addDivs(response);

      	}   	        // Open the request
    }
    xhr.open('GET', 'http://yrs.ducsuus.com/test/project/server/PHP/getstages.php?code=' + 'jyrs', true);

    console.log('http://yrs.ducsuus.com/test/project/server/PHP/getstages.php?code=' + 'jyrs');

    // Set out the POST headers (GET request)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // Send the request (nothing inside it)
    xhr.send(null);

}


getStages();
setTimeout(function(){ drawStages(response); }, 1000);
