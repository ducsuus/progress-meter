<?php
// Page to create account

require 'sessiontrackfunctions.php';

// Enable error reporting
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', '1');

$acceptable_input = true;

if (strlen($_POST['username']) > 63){
	$acceptable_input = false;
}

if(!ctype_alnum($_POST['username'])){
	$acceptable_input = false;
}

if (strlen($_POST['password']) > 63){
	$acceptable_input = false;
}

if(!ctype_alnum($_POST['password'])){
	$acceptable_input = false;
}

if(strlen($_POST['phonenumber']) < 15){
	$acceptable_input = false;
}

if(!is_numeric($_POST['phonenumber'])){
	$acceptable_input = false;
}

if (strlen($_POST['email']) > 63){
	$acceptable_input = false;
}

if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
	$acceptable_input = false;
}

if(!$acceptable_input){
	echo 'No acceptable input!';
}

/* Check to see if an entry already exists with the same details */

// Setup the connection 
$conn = new PDO('mysql:host=localhost;dbname=progress-bar;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');

// Check the username
$statement = $conn->prepare('SELECT * FROM members WHERE username=:username LIMIT 1');

unset($statement_parameters);

$statement_parameters->

if ($acceptable_input){
	$username = $_POST['username'];
	$password = $_POST['password'];
	$email = $_POST['email'];
	$phonenumber = $_POST['phonenumber'];

	// Hash the password

	$hashed_password = hash('sha512', $password . $username);

	// Prepare a statement to extract all of the details we need to know about users 
	$statement = $conn->prepare('INSERT INTO members (username, password, email, phonenumber) VALUES (:username, :password, :email, :phonenumber);');

	// Clear the statement_parameters array
	unset($statement_parameters);

	// Set the statement_parameters array
	$statement_parameters[':username'] = $username;
	$statement_parameters[':password'] = $hashed_password;
	$statement_parameters[':email'] = $email;
	$statement_parameters[':phonenumber'] = $phonenumber;

	if($statement->execute($statement_parameters)){
		if(login($username, $password)){
			echo 'New account created, yay :D';
		}else{
			echo ' no login :(';
		}
	}
	else{
		echo 'dsadasdsada';
		$statement->errorInfo();
	}

   
}