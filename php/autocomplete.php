<?php

$val = $_GET['value'];

    $json_data = '[{
        "caption": "sample text1"
    },
    {
        "caption": "sample text2"
    },
    {
        "caption": "sample text3"
    },
    {
        "caption": "sample text4"
    },
    {
        "caption": "sample text5"
    },
    {
        "caption": "sample text6"
    },
    {
        "caption": "sample text7"
    }]';


$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);
echo $json_data;
exit;
?>
