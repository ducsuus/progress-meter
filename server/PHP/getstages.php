<?php

// view.php 

/*
//
// Use a single GET request with a view code can be used to view the progress bar
//
// Parameters:
// 
//
//
*/

// Enable error reporting
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', '1');

// Check to see if the code supplied is alphanumerical (a requirement)
if(!ctype_alnum($_GET['code'])){
    // Tell the user it was an invalid URL code
    echo 'Invalid url code!';
    // End the program, no security vulnerabilities here! TODO: handle this in a nicer way
    die();
}

// Everthing is in a try catch statement so that we can handle errors
try{

    // If the code is 4 characters long, we are viewing the progress bar TODO: add the functionality for people editing their progress bar to view as well, print this anyway?
    if (strlen($_GET['code']) === 4){

        // Create connection to the mySQL database
        $conn = new PDO('mysql:host=localhost;dbname=progress-bar;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');

        // Prepare a statement to find try and find a entry with the view code supplied (the BINARY tag is used to make sure that case does matter)
        $statement = $conn->prepare('SELECT * FROM progress_bars WHERE BINARY viewcode=:viewcode;');

        // Pass in the code TODO: use the filter_input function
        $statement_parameters[':viewcode'] = $_GET['code'];

        // Execute the statement with the parameters
        $statement->execute($statement_parameters);

        // Fetcth the esult of the query, use the FETCH_ASSOC method so that we can acess the array using string properties, for example $result['name']
        $result = $statement->fetch(PDO::FETCH_ASSOC);

        // If the entry exists
        if($result){

            // Prepare a statement to list all of the stages for this progress bar
            $statement = $conn->prepare('SELECT * FROM stages WHERE progress_bars_id=:id;');

            // Clear the statement_parameters array
            unset($statement_parameters);

            // Add the id to the statement for the progress bar we are using
            $statement_parameters[':id'] = $result['id'];

            // Execute the statement with the statement parameters
            $statement->execute($statement_parameters);

            // Check to see if we successfully fetched the array
            if ($stages_array = $statement->fetchAll(PDO::FETCH_ASSOC)){
                // Send the array in JSON to the client if successfull
                echo json_encode($stages_array);
            }

        } 
        // The entry doesn't exist, tell the user
        else{

            echo 'Invalid url code!';

        }
    } 

    // Invalid code, let's give them a 404 and a big smile
    else {

        echo 'Invalid URL Code - that\'s a 404!';

    }
// Catch the excpetion if there is one and print it out
} catch(exception $ex){
    echo $ex->getMessage();
}

?>
