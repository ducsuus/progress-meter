<?php
require 'sessiontrackfunctions.php';
 
// Use our custom session start function (allegedly more secure...)
sec_session_start();
 
// If a username and password has been posted
if (isset($_POST['username'], $_POST['password'])) {

    // The username
    $username = $_POST['username'];
    // The password
    $password = $_POST['password'];
 
    // 
    if (login($username, $password) == true) {
        // Login success 
        //header('Location: ../ITworksYAY.php');
        echo 'logged in!';
    } else {
        // Login failed 
        //header('Location: ../index.php?anERRORoccuredANDitWASbecauseYOUcouldntLOGin');
        echo 'ERROR occured!';
    }
} else {
    // The correct POST variables were not sent to this page. 
    echo 'Invalid Request';
}