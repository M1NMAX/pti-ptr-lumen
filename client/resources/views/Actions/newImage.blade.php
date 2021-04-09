<?php

    if ( isset($_POST["profileUser"] )){
       /* session_start();
        $nick = $_SESSION["nick"];
*/
        $file = $_FILES["fileInput"];
        print_r($file);
        $fileName = $_FILES["fileInput"]["name"];
        $fileTmpName = $_FILES["fileInput"]["tmp_name"];
        $fileSize = $_FILES["fileInput"]["size"];
        $fileError = $_FILES["fileInput"]["error"];
        $fileType = $_FILES["fileInput"]["type"];
        $new = "yes";

        $fileExt = explode(".", $fileName);
        $fileActualExt = strtolower(end($fileExt));


        $allowed  = "jpeg";

    if ($fileActualExt == $allowed) {
        if ($fileError === 0) {
            if ($fileSize < 5000000) {
                    $fileNameNew = "perfil".$nick. "." . $fileActualExt;
                    $fileDes = "upload/" . $fileNameNew;

                    move_uploaded_file($fileTmpName, $fileDes);
                    $sql ="UPDATE user SET imagemPerfil='".$new ."' WHERE username = ? ";

                if ($stmt = mysqli_prepare($conn, $sql)) {
                    mysqli_stmt_bind_param($stmt, "s", $nick);
                    mysqli_stmt_execute($stmt);
                    header("Location: ../Projeto/perfil.php?result=success");
                exit();

                }else {
                    echo mysqli_error($conn);
                }

        }else {
            header("Location: ../Projeto/perfil.php?error=tooBig");
            exit();
        }
        }else {
            header("Location: ../Projeto/perfil.php?error=tranfer");
            exit();
        }

    }else {
        header("Location: ../Projeto/perfil.php?error=imgFormat");
        exit();
    }

    }
 ?>