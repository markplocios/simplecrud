<?php
    
require('database.php');
$data = array();
$query_select = "SELECT * from `account tbl`";

$result = mysqli_query($con, $query_select);
while($row=$result->fetch_array()){

    $data[] = array(
        'Username'=>$row['Username'],
        'Password'=>$row['Password'],
        'Name'=>$row['Name'],
        'action'=>  "<button type='button' onclick = 'edit_data(this)' class='btn btn-sm' data-bs-toggle='modal' data-bs-target='#exampleModal' > <i class='fas fa-edit'></i></button><button type='button' onclick ='deleteitem(this)'class='btn btn-sm'><i class='fas fa-trash-alt'></i></button>"
    );

}
$data_ = array("data"=>$data);
echo json_encode((object) $data_);
?>