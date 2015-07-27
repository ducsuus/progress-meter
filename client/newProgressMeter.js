// Create div array
var stages = [];
//[[id, name, description]]

function submitNewBarForm(){

	/* Prepare an array with all the information we need in */

	var json_array = {};

	json_array['name'] = document.getElementById('new-bar-form-name').value;
	console.log(document.getElementById('new-bar-form-name').value);
	json_array['description'] = document.getElementById('new-bar-form-description').value;
	json_array['stages'] = stages;

	var xhr = new XMLHttpRequest();

	xhr.open('POST', '../')

	xhr.onreadystatechange=function(){
		// Received a response from the server
		if (xhr.readyState==4 && xhr.status==200){
			console.log('Received a response: ' + xhr.responseText);
		}
		
	}

	// Open the request
	xhr.open('POST', '../server/PHP/newbar.php', true);
	// Set out the POST headers
	//xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

	// Send the array
	xhr.send(JSON.stringify(json_array));

	console.log(json_array);
	console.log(JSON.stringify(json_array));

}

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
				<button class="btn btn-default button-style" type="button" onclick="deleteStage()">Delete Stage</button>\
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