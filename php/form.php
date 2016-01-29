<?php
    $json_data = str_replace("\r\n",'',$json_data);
    $json_data = str_replace("\n",'',$json_data);

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

