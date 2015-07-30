<?php
// Included in each page where it may be important to have the user login

echo 'dasdads<br>';

/* Copied from online -> should probably go and comment this, verify the use of everything, and so on */
function sec_session_start() {
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
}

/* Again, copied from online */
function bad_login($email, $password, $mysqli) {
    // Using prepared statements means that SQL injection is not possible. 
    if ($stmt = $mysqli->prepare("SELECT id, username, password, salt 
        FROM members
       WHERE email = ?
        LIMIT 1")) {
        $stmt->bind_param('s', $email);  // Bind "$email" to parameter.
        $stmt->execute();    // Execute the prepared query.
        $stmt->store_result();
 
        // get variables from result.
        $stmt->bind_result($user_id, $username, $db_password, $salt);
        $stmt->fetch();
 
        // hash the password with the unique salt.
        $password = hash('sha512', $password . $salt);
        if ($stmt->num_rows == 1) {
            // If the user exists we check if the account is locked
            // from too many login attempts 
 
            if (checkbrute($user_id, $mysqli) == true) {
                // Account is locked 
                // Send an email to user saying their account is locked
                return false;
            } else {
                // Check if the password in the database matches
                // the password the user submitted.
                if ($db_password == $password) {
                    // Password is correct!
                    // Get the user-agent string of the user.
                    $user_browser = $_SERVER['HTTP_USER_AGENT'];
                    // XSS protection as we might print this value
                    $user_id = preg_replace("/[^0-9]+/", "", $user_id);
                    $_SESSION['user_id'] = $user_id;
                    // XSS protection as we might print this value
                    $username = preg_replace("/[^a-zA-Z0-9_\-]+/", 
                                                                "", 
                                                                $username);
                    $_SESSION['username'] = $username;
                    $_SESSION['login_string'] = hash('sha512', 
                              $password . $user_browser);
                    // Login successful.
                    return true;
                } else {
                    // Password is not correct
                    // We record this attempt in the database
                    $now = time();
                    $mysqli->query("INSERT INTO login_attempts(user_id, time)
                                    VALUES ('$user_id', '$now')");
                    return false;
                }
            }
        } else {
            // No user exists.
            return false;
        }
    }
}

function login($username, $password){

	// Setup the connection 
	$conn = new PDO('mysql:host=localhost;dbname=progress-bar;', 'php', '09^asfd#8fa67g^h!@h67^^hj%Sfy048#+');

	// Prepare a statement to extract all of the details we need to know about users 
	$statement = $conn->prepare('SELECT id, password, salt, email, phonenumber FROM members WHERE username=:username LIMIT 1');

	// Clear the statement_parameters array
	unset($statement_parameters);

	// Set the statement_parameters array
	$statement_parameters[':username'] = $username;

	// Run the statement, get a result from it, and if it is successfull continue
	if($result = $statement_parameters->execute($statement_parameters)){
		// Set all of the variables to what we obtained from the query
		$id = $result['id'];
		$database_password = $result['password'];
		$salt = $result['salt'];
		$email = $result['email'];
		$phonenumber = $result['phonenumber'];

		// Hash the given password to check if it is the same as that in the database
		$hashed_password = hash('sha512', $password . $salt);

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
			// Incorrect password, tell them so
			echo 'Incorrect username or password';
			return false;
		}
	} else{
		// Incorrect username, tell them so (this is the same as the password so that if they are just guessing usernames they can't tell if they got a username or password wrong)
		echo 'Incorrect username or password';
	}
}
echo 'dsadsad<br>';
echo 'Result: ' . login('ducsuus', 'password');
