<?php

    $name = $_GET['name'];
    $email = $_GET['email'];
    $phone = $_GET['phone'];
    $address = $_GET['address'];
    $language = $_GET['language'];
    $organization = $_GET['organization'];
    $site = $_GET['site'];
    $password = $_GET['password'];


    if ($_GET['application'] == true) {

        echo $email;

    }

    if ($_GET['discount'] == true) {

        echo $name, $email, $phone, $address, json_encode($language);

    }

    if ($_GET['registry'] == true) {

        echo $name, $email, $password;

    }
    if ($_GET['send'] == true) {

        echo $name, $email, $phone, $organization, $site ;

    }

    exit;
?>

