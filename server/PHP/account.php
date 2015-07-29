<?php
session_start();
// File to go and show people information about their accounts

require 'sessiontrackfunctions.php';

if (check_login()){

	echo 'You are logged in!';

	// Over here run some queries to go and check what progress bars someone has linked in to
}