<?php
require 'sessiontrackfunctions.php';
 
// Use our custom session start function (allegedly more secure...)
//sec_session_start();
session_start();
 
// The username
$username = $_POST[''];
// The password
$password = $_POST[''];
 