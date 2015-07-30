// Map tracker

// Function to go and update the stages on the page
function getStages(editCode){

    // Create a new XML HTTP request
    var xhr = new XMLHttpRequest();

    // Define a callback function to be called when we have our JSON from the server
    xhr.onreadystatechange=function() {
        // Received a response from the server
        if (xhr.readyState==4 && xhr.status==200) {
            
        	var stagesSelector = document.getElementById('stage-selector');

        	var response = JSON.parse(xhr.responseText);

        	for (var i = 0; i < response.length; i++){
        		stagesSelector.innerHTML += '<option value=\'' + i + '\'>' + response[i]['title'] + '</option>';
        	}

        }
    }

    // Open the request
    xhr.open('GET', 'http://yrs.ducsuus.com/test/project/server/PHP/getstages.php?code=' + editCode, true);

    // Set out the POST headers (GET request)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // Send the request (nothing inside it)
    xhr.send(null);

}

getStages('jyrs');