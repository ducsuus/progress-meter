<?php

// newbar.php - create a new progress bar

/*


*/

// Enable error reporting
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', '1');

// Function to generate a random string, with a given length
function randomString($random_string_length){
    
    // All the possible characters 
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Create a random string variable
    $random_string = '';
    // Loop through the length given
    for ($i = 0; $i < $random_string_length; $i++) {
        // Add a new character for each iteration
        $random_string .= $characters[rand(0, strlen($characters) - 1)];
    }

    // Return the random string
    return $random_string;
}

// Check to see if the name is an acceptable input
$acceptable_input = true;

$post_data = json_decode(file_get_contents('php://input'), true);

// Check if the name is under a certain length
if (strlen($post_data['name']) > 256){
    // The input is not acceptable
    $acceptable_input = false;
}

// Check if the name is under a certain length
if (strlen($post_data['name']) <= 0){
    // The input is not acceptable
    $acceptable_input = false;
}

//TODO: MAKE THIS WORK WITH OTHER OPTIONS

// If we have an acceptable input
if ($acceptable_input){

    header('Content-Type: application/json');

    // Put everything in a try statement to handle errors
    try{

        $bar_properties = [];

        // James (or whoever changed this): Bar properties is an array. Please don't try and set it to be a meer string, it has feelings too.
        $bar_properties['name'] = $post_data['name'];

        // Create connection
        $conn = new PDO('mysql:host=localhost;dbname=progress-bar;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');

        // Generate and check the view and edit codes //

        /* Keep trying until a non-taken view code is found. 14.7 million possible codes here, for this to average at one iteration, 7.35 
           million progress bars must have been created. This is only inefficient when a large majority of codes have been taken. At this
           point, a new system should be used anyway; more codes should be added, or old ones should be removed */

        // Prepare a statement
        $statement = $conn->prepare('SELECT * FROM progress_bars WHERE BINARY viewcode=:viewcode');

        // Delete all existing properties
        unset($statement_parameters);

        do {

            // Generate a view code
            $view_code = randomString(4);

            // Pass the view code in to the statement
            $statement_parameters[':viewcode'] = $view_code;

            // Execute the statement
            $statement->execute($statement_parameters);

            // Fetch the result from the statement
            $result = $statement->fetch(PDO::FETCH_ASSOC);

          // If the result exists, we need a new code
        } while ($result);

        //echo 'View code: ' . $view_code . '<br>';
        // Add the viewcode
        $bar_properties['viewcode'] = $view_code;

        /* Repeat again for the edit code. The edit code has far more digits because it needs to be more secure; it's really important no
           one can guess the edit code, because they would be able to go and edit it at any point... */
        
        $statement = $conn->prepare('SELECT * FROM progress_bars WHERE BINARY editcode=:editcode');

        unset($statement_parameters);

        do {

            $edit_code = randomString(20);

            $statement_parameters[':editcode'] = $edit_code;

            $statement->execute($statement_parameters);

            $result = $statement->fetch(PDO::FETCH_ASSOC);

        } while ($result);

        //echo 'Edit code: ' . $edit_code . '<br>';        
        // Add the editcode
        $bar_properties['editcode'] = $edit_code;

        // Add a new row with the name of the progress bar, a view code, and a edit code
       
       // Prepare another statement to add the progress bar to the database
        $statement = $conn->prepare('INSERT INTO progress_bars (name, total_stages, viewcode, editcode) VALUES (:name, :total_stages, :viewcode, :editcode)');

        unset($statement_parameters);

        $statement_parameters[':name'] = $post_data['name'];
        $statement_parameters[':total_stages'] = sizeof($post_data['stages']);
        $statement_parameters[':viewcode'] = $view_code;
        $statement_parameters[':editcode'] = $edit_code;

        // If we made a new entry, tell the use it was successfull
        if ($statement->execute($statement_parameters) === TRUE) {
            //echo "New record created successfully";

            // Made the new entry, success! TODO: move the stuff below to be AFTER we've gone and added the stages

            echo json_encode($bar_properties);
        }else{
            echo 'Errors: ';
            print_r($statement->errorInfo());
        }

        /* Now that we've added the progress bar, we need to add the stages */

        // So unfortunatly we need to go and get the ID of the entry we just created TODO: is there a better way than running ANOTHER query?!
        // Prepare a statement to find try and find a entry with the view code supplied (the BINARY tag is used to make sure that case does matter)
        $statement = $conn->prepare('SELECT * FROM progress_bars WHERE BINARY viewcode=:viewcode;');

        // Clear up the statement_parameters variable
        unset($statement_parameters);

        // Pass in the code TODO: use the filter_input function
        $statement_parameters[':viewcode'] = $view_code;

        // Execute the statement with the parameters
        $statement->execute($statement_parameters);

        // Fetcth the esult of the query, use the FETCH_ASSOC method so that we can acess the array using string properties, for example $result['name']
        $id = $statement->fetch(PDO::FETCH_ASSOC)['id'];

        // All that, just to get an ID...

        // Prepare a statement to add each stage to
        $statement = $conn->prepare('INSERT INTO stages (progress_bars_id, stage_order, title, information) VALUES (:progress_bars_id, :stage_order, :title, :information)');

        // Set the parameters

        unset($statement_parameters);

        // The ID only needs to be set once
        $statement_parameters[':progress_bars_id'] = $id;
        
        // Define the stage order, increment each iteration - manually incrementing because it looks nicer to use a foreach loop with arrays (this may get a lot bigger in the future)
        $stage_order = 0;

        // Loop through all of the stages
        foreach($post_data['stages'] as $stage){
            // Stage order
            $statement_parameters[':stage_order'] = $stage_order;
            // The stage title
            $statement_parameters[':title'] = $stage[0];
            // The stage information
            $statement_parameters[':information'] = $stage[1];

            // Increment the stage order
            $stage_order++;

            // Execute and check the success of the statement
            if(!$statement->execute($statement_parameters)){
                // Not successfull, echo errors TODO: give the error here?
                echo 'Errors (line number 188): ';
                print_r($statement->errorInfo());
            }
        }

    }catch(exception $ex){
        echo $ex->getMessage();
    }
} else{
    // No acceptable input, let's give them a form to submit

    // One lined so it doesn't mess with your eyes, literally a copy and paste from yrs.ducsuus.com/project/pre-test/new.html
    echo '<html><head><title>Create a new progress bar</title></head><body><form action=\'newbar.php\' method=\'post\'>Name of progress bar: <input type="text" name="name"><br>Total stages: <input type="number" name="total_stages"><br><input type="submit"></form></body></html>';


}

?>
