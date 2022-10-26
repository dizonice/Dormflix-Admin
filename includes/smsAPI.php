<?php

    if (isset($_POST['submit'])) {

        include '../includes/smsAPIContr.php';

        $receiver = $_POST['receiver'];
        $message = $_POST['message'];
        $smsAPICode = "your_code_here";
        $smsAPIPassword = "your_password_here";
        
        $send = new iTextMoController();

        $send->itexmo($receiver, $message, $smsAPICode, $smsAPIPassword);

        >
        if ($send == false) {
            header("location: ../notices.html?error=itexmo: No response from server");
        }elseif ($send == true) {
            header("location: ../notices.html?error=none");
        }else {
            header("location: ../notices.html?error=An error occured.");
        }
    }
