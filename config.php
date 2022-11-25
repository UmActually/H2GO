<?php 
define('DB_HOST'    , 'us-cdbr-east-06.cleardb.net'); 
define('DB_USERNAME', 'bd670e0228877e'); 
define('DB_PASSWORD', 'f343723d'); 
define('DB_NAME'    , 'heroku_fd12f7f7304c66a');

define('POST_DATA_URL', 'https://iot-h2go.herokuapp.com/db-endpoint.php');

//PROJECT_API_KEY is the exact duplicate of, PROJECT_API_KEY in NodeMCU sketch file
//Both values must be same
define('PROJECT_API_KEY', 'sinpuntos.magnetico.puente');


//set time zone for your country
date_default_timezone_set('Mexico/General');

// Connect with the database 
$db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME); 
 
// Display error if failed to connect 
if ($db->connect_errno) { 
    echo "Connection to database is failed: ".$db->connect_error;
    exit();
}
