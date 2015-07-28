<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');


// Sends a message to the Python Websocket server telling it to update all clients with the viewcode supplied
function updateProgressBar($viewcode){

    // Create connection
    $conn = new PDO('mysql:host=localhost;dbname=progress;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');

    // Get the stage for the viewcode
    $update_statement = $conn->prepare('SELECT stage FROM bars WHERE viewcode=:viewcode');

    // Bind the viewcode
    $update_statement_parameters[':viewcode'] = $viewcode;

    // Run the query
    $update_statement->execute($update_statement_parameters);

    // Get the 'stage' value from the query
    $stage = $update_statement->fetch(PDO::FETCH_ASSOC)['stage'];

    // Create the message we are going to send
    // Shold be structured 'update:;viewcode:aDj3;stage:3'
    $message = 'update:;viewcode:' . $viewcode . ';stage:' . $stage . ';:endof';

    echo $message;

    // Create a socket, continue if succesful
    if ($sock = socket_create(AF_INET, SOCK_DGRAM, 0)){
        // Bind the socket, continue if succesful
        if(socket_bind($sock, '127.0.0.1', 8898)){
            // Send the message to the Python Websocket server
            socket_sendto($sock, $message, strlen($message), 0, '127.0.0.1', 8899);
            // We were probably succesful, return true
            return true;
        }
    }
    // Unsuccesful, return false
    return false;
}

updateProgressBar('j2YZ');