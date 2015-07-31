<?php

session_start();

// update.php 

/*
//
// Use a POST request (in combination with a edit code as a GET request) to update a progress bar
//
// Parameters:
// 
//
//
*/

$editcode = $_GET['code'];

$acceptable_input = true;

if(strlen($editcode) != 20){
	echo 'Invalid code (edit codes are 20 characters long');
	$acceptable_input = false;
}

if($acceptable_input){
	// Create connection
	$conn = new PDO('mysql:host=localhost;dbname=progress-bar;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');

	$statement = $conn->prepare('SELECT id FROM progress_bars WHERE editcode=:editcode; LIMIT 1');

	unset($statement_parameters);

	$statement_parameters[':editcode'] = $editcode;

	$statement->execute($statement_parameters);

	if($result = $statement->fetch(PDO::FETCH_ASSOC)){
		// Valid editcode

		if (isset($_POST['id']) && isset($_POST['complete'])){
			// We probably have correct details

			if (is_numeric($_POST['stage-id']) && ($_POST['stage-complete'] == '0' || $_POST['stage-complete'] == '1')){
				// Likely valid details

				$statement = $conn->prepare('UPDATE stages SET complete=:complete WHERE progress_bars_id=:progress_bars_id AND stage_order=:stage_order;');

				unset($statement_parameters);

				$statement_parameters[':complete'] = $_POST['stage-complete'];
				$statement_parameters[':progress_bars_id'] = $result['id'];
				$statement_parameters[':stage_order'] = $_POST['stage-id'];

				$statement->execute($statement_parameters);

			}

		}

	}
}