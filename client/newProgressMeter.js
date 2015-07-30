// Create div array
var stages = [];
//[[name, description]]

function submitNewBarForm(){

	/* Prepare an array with all the information we need in */

	var json_array = {};

	json_array['name'] = document.getElementById('new-bar-form-name').value;
	json_array['description'] = document.getElementById('new-bar-form-description').value;
	json_array['stages'] = stages;

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange=function(){
		// Received a response from the server
		if (xhr.readyState==4 && xhr.status==200){
			console.log('Received a response: ' + xhr.responseText);

			// here goes adding the codes to HTML

			var response = JSON.parse(xhr.responseText);

			if(response['viewcode'] && response['editcode']){
				console.log('Received valid JSON response');

				var formContainer = document.getElementById('form-container');

				var viewCodeURL = 'http://yrs.ducsuus.com/test/project/client/viewProgressMeter/?code=' + response['viewcode'];

				var editCodeURL = 'http://yrs.ducsuus.com/test/project/client/viewProgressMeter/?code=' + response['editcode'];

				var codeHTML = "<html><body><div style='display: inline-block;padding: 8px;background-color: #FFD119;border-radius: 15px;border: 2px solid #E6BC16;margin: 5px;font-family: Lucida Console;'><b><a href='" + viewCodeURL + "'>View code:</a> </b><input id='url-viewcode' type='text' value='" + viewCodeURL + "' style='border-radius: 10px;padding: 5px;outline: none;'onclick=\"document.getElementById(\'url-viewcode\').select()\" readonly></div><br><div style='display: inline-block;padding: 8px;background-color: #FFD119;border-radius: 15px;border: 2px solid #E6BC16;margin: 5px;font-family: Lucida Console;'><b><a href='" + editCodeURL + "'>Edit code:</a> </b><input id='url-editcode' type='text' value='" + editCodeURL + "' style='border-radius: 10px;padding: 5px;outline: none;'onclick=\"document.getElementById(\'url-editcode\').select()\"' readonly></div>";

				formContainer.innerHTML = codeHTML;

			}

		}
		
	}

	// Open the request
	xhr.open('POST', '../server/PHP/newbar.php', true);
	// Set out the POST headers
	//xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

	// Send the array
	xhr.send(JSON.stringify(json_array));

}

function addNewStage(){
	stageID = stages.length;

	stages.push(['Name', 'Description']);
	updateStages();
}

function deleteStage(id){

	stages.splice(id, 1);

	updateStages();
}

// Function to re-draw all stages
function updateStages() {
	var stageContainer = document.getElementById('stages-container');

	var stageHTML = ''

	console.log(stages);

	for (var i = 0; i < stages.length; i++){
		console.log(stages[i][1]);
		// Much easier on our eyes if we use stageID instead of i
		var stageID = i;
		stageHTML += '<div class="edit-stage"><div class="form-group"><div class="button-container"><label class="form-label" for="stageName">Stage ' + (i + 1) + '</label><button id="deleteButton' + i + '" class="btn btn-default button-style" type="button" onclick="deleteStage(' + i + ')">Delete Stage</button></div><input onchange="updateStageData(\'name\', ' + stageID + ')" id="name-' + stageID + '" type="text" class="form-control stage-form" value="' + stages[i][0] + '" placeholder="Stage ' + (i + 1) + ' Name"></div><div class="form-group"><input id="description-' + stageID + '" type="text" value="' + stages[i][1] + '" class="form-control stage-form" stageDesc="stageDesc" onchange="updateStageData(\'description\', ' + stageID + ')" value="descData' + stageID + '" placeholder="Description">	</div></div>';
	}

	stageContainer.innerHTML = stageHTML;
	
}

function updateStageData(name, id) {

	console.log('I was called! -> Name: ' + name + ' ID: ' + id);
	
	var properties = ['name', 'description'];

	var inputProperty = document.getElementById(name + '-' + id);

	stages[id][properties.indexOf(name)] = inputProperty.value;

}