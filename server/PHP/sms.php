<?php
// Enable error reporting
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', '1');

require 'class-Clockwork.php';

function sendSms(){
    
    
    // Create a Clockwork object using your API key
    $key = "2cb8a8f432abf611a26ab0c51e3a99c70fa01e67";
    $clockwork = new Clockwork( $key );

    // Setup and send 
    $messageToSend = "Hello Joe";
    $mobileNumber = "07805979775";    
        
    $message = array( "to" => $mobileNumber, "from" => "Yrs Eastbourne","message" => $messageToSend );
    $result = $clockwork->send( $message );

    // Check if the send was successful
    if( $result["success"] ) {
        echo "Message sent - ID: " . $result["id"];
    } else {
        echo "Message failed - Error: " . $result["error_message"];
    }
}

sendSms();
?>