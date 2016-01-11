<?php
session_start();

include_once("./config.php");

$imgName = $__config['path']['imgUpload'] . 'marged-' . $_SESSION["uploads"]["img"]["tmpName"];


if (file_exists($imgName)) {
    // сбрасываем буфер вывода PHP, чтобы избежать переполнения памяти выделенной под скрипт
    // если этого не сделать файл будет читаться в память полностью!
    if (ob_get_level()) {
      ob_end_clean();
    }
    // заставляем браузер показать окно сохранения файла
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename=' 
                    . $_SESSION["uploads"]["img"]["origName"]);
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($imgName));
    // читаем файл и отправляем его пользователю
    if ($fd = fopen($imgName, 'rb')) {
      while (!feof($fd)) {
        print fread($fd, 1024);
      }
      fclose($fd);
    }
    exit();
} else {
    echo "Ошибочка вышла $imgName";

}