<?php

$sname= "localhost";
$unmae= "valentina";

$db_name = "test_db";

$conn = mysqli_connect($sname, $unmae, $db_name);

if (!$conn) {
	echo "Connection failed!";
}