// Create div array
var stages = [];
//[[name, description]]

function addNewStage(){
	stages.push(['dsadsadassadasd', 'dsaasddasdas']);
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

	for (var i = 0; i < stages.length; i++){
		stageHTML += '<div class="edit-stage"><div class="form-group"><label class="form-label" for="stageName">Stage ' + (i + 1) + '</label>		<button id="deleteButton' + i + '" class="btn btn-default button-style" type="button" onclick="deleteStage(' + i + ')">Delete Stage</button>		<input type="text" class="form-control stage-form" placeholder="Stage ' + (i + 1) + ' Name">	</div>	<div class="form-group">		<input type="text" class="form-control stage-form" stageDesc="stageDesc" placeholder="Description">	</div></div>';
	}

	stageContainer.innerHTML = stageHTML;
	
}