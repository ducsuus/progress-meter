// Create div array
var stages = [];
//[[id, name, description]]

function addNewStage() {
	var stageID = stages.length;
	var stageName = 'Untitled Stage';
	var stageDesc = 'Undescribed Stage';
	stages.push([stageID, stageName, stageDesc]);

	var stageContainer = document.getElementById('joetesting');

	stageContainer.innerHTML += '<div id="stage-"' + stageID +'\
	<form>\
		<div class="edit-stage">\
			<div class="form-group">\
				<label class="form-label" for="stageName">Stage ' + (stageID + 1) + '</label>\
				<!--<label class="form-label">Name</label> -->\
				<input type="text" class="form-control stage-form" placeholder="Stage ' + (stageID + 1) + ' Name">\
			</div>\
			<div class="form-group">\
				<!--<label class="form-label" for="stageDesc">Description</label>-->\
				<input type="text" class="form-control stage-form" stageDesc="stageDesc" placeholder="Description">\
			</div>\
		</div>';



}

// Remove button function
	// (AS PART OF LAYER TEMPLATE)
	// Remove from array
	// Remove DIV with stage ID