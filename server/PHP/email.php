<?php
// Imports php files required for clockwork to send messages
var id = 0

function email(id){
    // Create a PDO connection
    $conn = new PDO('mysql:host=localhost;dbname=progress-bars;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');
    
    // Looks for things in the database
    $email = $conn->prepare('SELECT email FROM members WHERE BINARY id=:id;');
    
    $to      = $email;
    $subject = 'Progress Bar Alert'; 
    $message = ".... stage has been completed."; //TODO: replace with the latest stage that has been completed from the progress bar
    
    //For when put on server
    //$message = $conn->prepare('SELECT * FROM progress_bars WHERE editcode=:editcode;');
    $headers = 'From: test@jamesrmuir.uk' . "\r\n" .  //TODO: be updated with Joe's info
        'Reply-To: test@jamesrmuir.uk' . "\r\n" .  //TODO: be updated with Joe's info
        'X-Mailer: PHP/' . phpversion();

    echo "Email sent.";
    mail($to, $subject, $message, $headers);
}

echo "php worked";
?> 

