// Create div array
var stages = [];
//[[name, description]]

function addNewStage(){
	stageID = stages.length;

	stages.push(['Name', 'Description']);
	updateStages();
}

function deleteStage(id){
	stages.pop(id);
	updateStages();
}

// Function to re-draw all stages
function updateStages() {
	var stageContainer = document.getElementById('joetesting2');

	var stageHTML = ''

	console.log(stages);

	for (var i = 0; i < stages.length; i++){
		console.log(stages[i][1]);
		stageHTML += '<div class="edit-stage"><div class="form-group"><label class="form-label" for="stageName">Stage ' + (i + 1) + '</label><button id="deleteButton' + i + '" class="btn btn-default button-style" type="button" onclick="deleteStage(' + i + ')">Delete Stage</button><input onchange="updateStageData(\'name\', ' + stageID + ')" id="name-' + stageID + '" type="text" class="form-control stage-form" value="' + stages[i][0] + '" placeholder="Stage ' + (i + 1) + ' Name"></div><div class="form-group"><input id="description-' + stageID + '" type="text" value="' + stages[i][1] + '" class="form-control stage-form" stageDesc="stageDesc" onchange="updateStageData(\'description\', ' + stageID + ')" value="descData' + stageID + '" placeholder="Description">	</div></div>';
	}

	stageContainer.innerHTML = stageHTML;
	
}

function updateStageData(name, id) {
	
	var properties = ['name', 'description'];

	var inputProperty = document.getElementById(name + '-' + id);

	stages[id][properties.indexOf(name)] = inputProperty.value;

}