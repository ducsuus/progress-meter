<?php
// Included in each page where it may be important to have the user login

// Enable error reporting
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', '1');

/* Copied from online -> should probably go and comment this, verify the use of everything, and so on */
/*function sec_session_start() {
    $session_name = 'sec_session_id';   // Set a custom session name
    $secure = SECURE;
    // This stops JavaScript being able to access the session id.
    $httponly = true;
    // Forces sessions to only use cookies.
    if (ini_set('session.use_only_cookies', 1) === FALSE) {
        header("Location: ../error.php?err=Could not initiate a safe session (ini_set)");
        exit();
    }
    // Gets current cookies params.
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params($cookieParams["lifetime"],
        $cookieParams["path"], 
        $cookieParams["domain"], 
        $secure,
        $httponly);
    // Sets the session name to the one set above.
    session_name($session_name);
    session_start();            // Start the PHP session 
    session_regenerate_id(true);    // regenerated the session, delete the old one. 
}*/

/* Login the user */
function login($username, $password){

	// Setup the connection 
	$conn = new PDO('mysql:host=localhost;dbname=progress-bar;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');

	// Prepare a statement to extract all of the details we need to know about users 
	$statement = $conn->prepare('SELECT id, password, email, phonenumber FROM members WHERE username=:username LIMIT 1;');

	// Clear the statement_parameters array
	unset($statement_parameters);

	// Set the statement_parameters array
	$statement_parameters[':username'] = $username;

    $statement->execute($statement_parameters);
	// Run the statement, get a result from it, and if it is successfull continue
	if($result = $statement->fetch(PDO::FETCH_ASSOC)){
		// Set all of the variables to what we obtained from the query
		$id = $result['id'];
		$database_password = $result['password'];
		$email = $result['email'];
		$phonenumber = $result['phonenumber'];

		// Hash the given password to check if it is the same as that in the database
		$hashed_password = hash('sha512', $password . $username);

		// Check to see if the passwords are the same
		if($hashed_password == $database_password){
			// Success - let's log the user in!

			// Get the user's browser
            $user_browser = $_SERVER['HTTP_USER_AGENT'];

       		// We're not going to replace all non numerical characters in the ID because guess what? ITS AN INTEGER. Jamesus christ.

            // Let's add some stuff to the _SESSION variable - *apparently* the session variable is serverside; it can't be accessed via the client
            $_SESSION['user_id'] = $user_id;

            // NOW we can use preg_replace, this may have tags in it. No, we can't use mutliple lines to make it more 'user friendly'.
            $username = preg_replace("/[^a-zA-Z0-9_\-]+/", "", $username);

            // Set the username for the session vairable
            $_SESSION['username'] = $username;
            // Set the login string by hashing the password and the user browser together... Wut?
            $_SESSION['login_string'] = hash('sha512', $hashed_password . $user_browser);

            // Login successful, tell the world!
            return true;
		}else{
			// Incorrect password
            return false;

		}
	} else{
		// Incorrect username
		return false;
	}
}

// Check to see what user is currently logged in (if any!)
function check_login(){
    // Check to see if the username is set in the session details
    if (isset($_SESSION['username'])) {
        return $_SESSION['username'];
    } else {
        // Not logged in 
        return false;
    }
}
