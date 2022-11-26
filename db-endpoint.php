<?php 
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$api_key = escape_data($_POST["api_key"]);
        //print_r($_POST);
        //echo "<br>PROJECT_API_KEY: ".PROJECT_API_KEY."<br>";
	if ($api_key == PROJECT_API_KEY) {
		$temperature = escape_data($_POST["temperature"]);
		$humidity = escape_data($_POST["humidity"]);
		
		$sql = "INSERT INTO tests(temperatura,humedad,tiempo) 
			VALUES('".$temperature."','".$humidity."','".date("Y-m-d H:i:s")."')";

		if($db->query($sql) === FALSE)
			{ echo "Error: " . $sql . "<br>" . $db->error; }

		echo "OK. INSERT ID: ";
		echo $db->insert_id;
	} else {
		echo "Wrong API Key";
	}
} else {
	echo "No HTTP POST request found";
}

function escape_data($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function console_log($output, $with_script_tags = true) {
    $js_code = "console.log(".json_encode($output, JSON_HEX_TAG).");";
    if ($with_script_tags) {
        $js_code = "<script>".$js_code. "</script>";
    }
    echo $js_code;
}
?>
