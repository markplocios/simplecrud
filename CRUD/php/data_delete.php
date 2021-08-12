<?php
    
    require('database.php');
    $input = json_decode( file_get_contents('php://input'), true);
    $data = array();
    $username = $input['username'];

    $sql_delete = "DELETE FROM  `account tbl` WHERE Username='$username'";

    if ($con->query($sql_delete) === TRUE) {
    echo 1;
    } else {
    echo $con->error;
    }
?>