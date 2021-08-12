<?php
    
    require('database.php');
    $input = json_decode( file_get_contents('php://input'), true);
    $data = array();
    $username = $input['username'];
    $password = $input['password'];
    $name = $input['name'];


    $sql = "UPDATE `account tbl` SET Password='$password',Name='$name' WHERE Username='$username'";

    if ($con->query($sql) === TRUE) {
        echo 1;
    } else {
        echo $con->error;
    }
?>