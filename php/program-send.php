<?php
$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);

$organization = $_GET['name'];
$name = $_GET['contact-name'];
$site = $_GET['site-name'];
$phone = $_GET['phone'];
$email = $_GET['email'];

if ($_GET['application'] == true) {

    echo $email;

}

if ($_GET['discount'] == true) {

    echo $name, $email, $phone, $organization, $site ;

}


exit;
?>
