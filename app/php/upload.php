<?php
// На вход подается с формы 1 Файл, а также его тип.
// На выход отдаем объект JSON с данными файла или формат ошибки

session_start();

// Не указан тип файла
if (!isset($_POST["filetype"])) {
    echo json_encode( array(
        'status' => 'error',                 
        'errorType' => 'queryFormat',
        'errorData' => "Не указан тип файла"             
        ), JSON_FORCE_OBJECT
    );     
    exit();  
}

// проверяем тип файла
$fileType = htmlentities(trim($_POST["filetype"]), ENT_QUOTES, "UTF-8");

if ($fileType != "img" || $fileType != "watermark") {
    echo json_encode( array(
        'status' => 'error',                 
        'errorType' => 'queryFormat',
        'errorData' => "Формат файла указан не верно: " . $fileType              
        ), JSON_FORCE_OBJECT
    );     
    exit();  
}

// Файл нужного типа не загружен, или загружен пустой файл
if (!isset($_FILES[$fileType])) {
    echo json_encode( array(
        'status' => 'error',                 
        'errorType' => 'img',
        'errorData' => "Файл не загружен"              
        ), JSON_FORCE_OBJECT
    );     
    exit();
}

if ($_FILES[$fileType]["size"] == 0) {
    echo json_encode( array(
        'status' => 'error',                 
        'errorType' => 'img',
        'errorData' => "Файл пустой"              
        ), JSON_FORCE_OBJECT
    );     
    exit();
}

// Ошибка загрузки
switch ($_FILES[$fileType]['error']) {
    case UPLOAD_ERR_OK:
        break;
    case UPLOAD_ERR_NO_FILE:
        echo json_encode( array(
            'status' => 'error',                 
            'errorType' => 'img',
            'errorData' => "Файл не загружен"              
            ), JSON_FORCE_OBJECT
        );     
        exit();
    case UPLOAD_ERR_INI_SIZE:
    case UPLOAD_ERR_FORM_SIZE:
        echo json_encode( array(
            'status' => 'error',                 
            'errorType' => 'img',
            'errorData' => "Недопустимый размер файла"              
            ), JSON_FORCE_OBJECT
        );     
        exit();
    default:
        echo json_encode( array(
            'status' => 'error',                 
            'errorType' => 'img',
            'errorData' => "Неизвестная ошибка"              
            ), JSON_FORCE_OBJECT
        );     
        exit();
}

// Грузим конфиг
include_once("./config.php");

// Превышен допустимый размер файла локальный
if ($_FILES[$fileType]["size"] > $__config["upload"]["maxFileSize"]) {
    echo json_encode( array(
        'status' => 'error',                 
        'errorType' => 'img',
        'errorData' => "Недопустимый размер файла"              
        ), JSON_FORCE_OBJECT
    );     
    exit();
}

// Проверяем на допустимый MIME
$finfo = new finfo(FILEINFO_MIME_TYPE);
if (false === $ext = array_search(
    $finfo->file($_FILES[$fileType]['tmp_name']),
    array(
        'jpg' => 'image/jpeg',
        'png' => 'image/png'
    ),
    true
)) {
    echo json_encode( array(
        'status' => 'error',                 
        'errorType' => 'img',
        'errorData' => "Недопустимый формат файла"              
        ), JSON_FORCE_OBJECT
    );     
}

echo json_encode( array(
        'status' => 'success'            
        ), JSON_FORCE_OBJECT
    );   