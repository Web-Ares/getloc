<?php
    $json_data = str_replace("\r\n",'',$json_data);
    $json_data = str_replace("\n",'',$json_data);

    $mail = "test@test";

    $headers = "From: \"application\" \n";
    $headers .= "Content-type: text/html; charset=utf-8 \r\n";

    if ($_GET['application'] == true) {

        $subject = "Сообщить о запуске";

        $message = "<h2>Сообщить мне о запуске</h2><hr>
                    <p><strong>Дата и время:</strong> " . date("Y-m-d H:i:s") . "</p>
                    <p><strong>Email:</strong> $_GET[email]</p>
        ";
    }

    if ($_GET['discount'] == true) {

        $subject = "Заказ";

        $message = "<h2>Заказ</h2><hr>
                        <p><strong>Дата и время:</strong> " . date("Y-m-d H:i:s") . "</p>
                        <p><strong>Имя:</strong> $_GET[name]</p>
                        <p><strong>Email:</strong> $_GET[email]</p>
                        <p><strong>Телефон:</strong> $_GET[phone]</p>
                        <p><strong>Адрес:</strong> $_GET[address]</p>
                        <p><strong>Язык перевода:</strong> $_GET[language]</p>
            ";
    }

    mail($mail, $subject, $message, $headers);

    exit;
?>

