<?php

$form1dividend = $_POST["form1dividend"];
$divisorAmount = $_POST["divisorAmount"];
$result = 0;

$errormsg = "error: NaNP";
$div_by_zero_msg = "error: cannot divide by 0";

//error checking to make sure they are both ints
if(($form1dividend !== null) && filter_var($form1dividend,FILTER_VALIDATE_INT) === false) {
    echo "{\"result\":\"---\"}";
    exit();
}

if(($divisorAmount !== null) && filter_var($divisorAmount,FILTER_VALIDATE_INT) === false) {
    echo "{\"result\":\"---\"}";
    exit();
}

if (($divisorAmount !== null) && ($divisorAmount !== null) && ($divisorAmount !== "0") && ($divisorAmount>0) && ($form1dividend>=0)){
    $result = $form1dividend % $divisorAmount;
} else if ($divisorAmount === "0") {
    $result = $div_by_zero_msg;
} else {
    $result = $errormsg;
}

echo "{\"result\":\"".$result."\"}";
?>

