<?php
// Imports php files required for clockwork to send messages

function email(){
    $to      = 'JRMuir09@Gmail.com';
    $subject = 'the subject';
    $message = "Hello World";
    //For when put on server
    //$message = $conn->prepare('SELECT * FROM progress_bars WHERE editcode=:editcode;');
    $headers = 'From: test@jamesrmuir.uk' . "\r\n" .
        'Reply-To: test@jamesrmuir.uk' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    echo "Email sent.";
    mail($to, $subject, $message, $headers);
}

echo "php worked";
?> 

