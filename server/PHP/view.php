<?php

// view.php 

/*
//
// Use a single GET request with a view code can be used to view the progress bar
// Alternatively, use a POST request (in combination with a edit code as a GET request) to edit a bar
//
// Parameters:
// 
//
//
*/



?>

<html>

<head>

<title>Josh should really get some CSS in here</title>

</head>

<body>

<h1>View stages</h1>

<?php

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

        // Create connection
        $conn = new PDO('mysql:host=localhost;dbname=progress-bars;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');

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
        	// Print out the current stats about the progress bar
            echo 'Name: ';
            print_r($result['name']);
            echo '<br>Stage: ';
            print_r($result['stage']);
            echo '<br>View code: ';
            print_r($result['viewcode']);
            echo '<br>Edit code: ';
            print_r($result['editcode']);
            echo '<br><br><br>';

            // Prepare a statement to list all of the stages for this progress bar
            $statement = $conn->prepare('SELECT * FROM stages WHERE id=:id;');

    		// Clear the statement_parameters array
            unset($statement_parameters);

            // Add the id to the statement for the progress bar we are using
            $statement_parameters[':id'] = $result['id'];

            // Execute the statement with the statement parameters
            $statement->execute($statement_parameters);

            // Keep fetching another row from the result of the query (using the ASSOC method) until there are no rows left
            while ($row = $statement->fetch(PDO::FETCH_ASSOC)){
            	// Print out the row each time TODO: Make this more user friendly; add a nice way of displaying stages and if they are done yet
                print_r($row);
                echo '<br>';
            }

        } 
        // The entry doesn't exist, tell the user
        else{

            echo 'Invalid url code!';

        }
    } 
    // If the user's code was 20 characters long it is a edit code, go into edit mode
    else if (strlen($_GET['code']) === 20){

        // Create connection to the database
        $conn = new PDO('mysql:host=localhost;dbname=progress-bars;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');

        // Prepare a statement to find the 
        $statement = $conn->prepare('SELECT * FROM progress_bars WHERE editcode=:editcode;');

        empty($statement_parameters);
        $statement_parameters[':editcode'] = $_GET['code'];

        $statement->execute($statement_parameters);

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        // If the entry exists
        if($result){
            // If the user has posted something (a form was submitted)
            if(!empty($_POST)){
                // If the client has decided to switch stages
                if($_POST['switch_stage_to']){

                    $statement = $conn->prepare('UPDATE progress_bars SET stage=:stage WHERE editcode=:editcode;');

                    // Make sure we sanitize the string so that no unwanted characters are there...
                    $statement_parameters[':stage'] = filter_input(INPUT_POST, 'switch_stage_to', FILTER_SANITIZE_STRING);
                    $statement_parameters[':editcode'] = $_GET['code'];

                    $statement->execute($statement_parameters);

                }

            }


            print_r($result['name']);
            echo '<br>';
            print_r($result['viewcode']);
            echo '<br>';
            print_r($result['editcode']);
            echo '<br><br><br>';

            echo '
                        <form action=\'#\' method=\'post\'>
                            Switch to stage: <input type="number" name="switch_stage_to"><br>

                            <input type="submit">
                        </form>

            ';
        } 
        // The entry doesn't exist
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

</body>

</html>