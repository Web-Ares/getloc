<?php

    $name = $_GET['name'];
    $email = $_GET['email'];
    $phone = $_GET['phone'];
    $address = $_GET['address'];
    $language = $_GET['language'];

    if ($_GET['application'] == true) {

        echo $email;

    }

    if ($_GET['discount'] == true) {

        echo $name, $email, $phone, $address, json_encode($language);

    }


    exit;
?>

