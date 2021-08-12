<?php
    
require('database.php');
$input = json_decode( file_get_contents('php://input'), true);
$data = array();
$username = $input['username'];
$password = $input['password'];
$name = $input['name'];


$insert_query = "INSERT INTO `account tbl` (Username, Password, Name)
VALUES ('$username', '$password', '$name')";
if ($con->query($insert_query) === TRUE) {
    echo 1;
  } else {
    echo $con->error;
}

?>