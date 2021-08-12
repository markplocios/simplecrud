<?php
	$con = mysqli_connect("localhost","root","");   // mysqli_connect("localhost","root","")
	if(!mysqli_select_db($con,"isuzu_exam_db")) 
	{
		die("connection error");
	}

	$base_url="http://".$_SERVER['SERVER_NAME'].dirname($_SERVER["REQUEST_URI"].'?').'/';
?>

