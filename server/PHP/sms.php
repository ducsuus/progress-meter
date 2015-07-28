<?php
// Enable error reporting
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', '1');

require 'class-Clockwork.php';

//function send-sms(){
    echo "Test";
    
    // Create a Clockwork object using your API key
    $key = "2cb8a8f432abf611a26ab0c51e3a99c70fa01e67";
    $clockwork = new Clockwork( $key );

    // Setup and send 
    //07730038889
    $message = array( "to" => "07805979775", "from" => "447860033646","message" => "Hello World" );
    $result = $clockwork->send( $message );

    // Check if the send was successful
    if( $result["success"] ) {
        echo "Message sent - ID: " . $result["id"];
    } else {
        echo "Message failed - Error: " . $result["error_message"];
    }
//}

//send-sms();
?>