<?php
    $to      = 'JRMuir09@Gmail.com';
    $subject = 'the subject';
    $message = 'hello world';
    $headers = 'From: test@jamesrmuir.uk' . "\r\n" .
        'Reply-To: test@jamesrmuir.uk' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    echo "PHP working fine";
    mail($to, $subject, $message, $headers);



?> 
