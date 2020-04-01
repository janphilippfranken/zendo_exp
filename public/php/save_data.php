<?php

	// Create a database connection
	$mysqli = mysqli_connect("chost4.is.ed.ac.uk","wwwbramleylabppl_neil","M2B(BKwEYa5.RXQ9", "wwwbramleylabppl_expdata");

	if (mysqli_connect_errno($mysqli)) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	// Get values passed from JS
	$ip = $_SERVER['REMOTE_ADDR'];
	$date = date('Y-m-d');
	$subject = $_POST['subject'];
	$results = $_POST['results'];

	//Create a query
	$query = "INSERT INTO zendo_kids1 (ip, date, subject, results) VALUES ('{$ip}', '{$date}', '{$subject}', '{$results}')";
	
	//Do it
	mysqli_query($mysqli, $query);

	//Close connection
	mysqli_close($mysqli);

?>
