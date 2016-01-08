<?php
session_start();

// Не указан тип файла
if (!isset($_GET["fileType"])) {
    echo json_encode( array(
        'status' => 'error',                 
        'errorType' => 'queryFormat',
        'errorData' => "Не указан тип файла"             
        ), JSON_FORCE_OBJECT
    );     
    exit();  
}

// проверяем тип файла
$fileType = htmlentities(trim($_GET["fileType"]), ENT_QUOTES, "UTF-8");

if (!($fileType == "img" || $fileType == "watermark")) {
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
    exit();    
}

// Копируем изображение

$sId = session_id(); // Получаем идентификатор сессии для именования файлов

// создаем путик файлам
$imgs['orig']['name']  = $sId . "-$fileType." . $ext;
$imgs['orig']['path']  = $__config["path"]["imgUpload"] . $imgs['orig']['name'];
$imgs['min']['name']   = $sId . "-$fileType-min." . $ext;
$imgs['min']['path']   = $__config["path"]["imgUpload"] . $imgs['min']['name'];

if (!move_uploaded_file ( $_FILES[$fileType]['tmp_name'], 
        $imgs['orig']['path'])) {
    echo json_encode( array(
        'status' => 'error',                 
        'errorType' => 'file',
        'errorData' => "Не удалось скопировать изображение: "
                       . $imgs['orig']['path']              
        ), JSON_FORCE_OBJECT
    ); 
    exit();   
}

// Получаем данные о размере изображения
$fileInfo  = getimagesize($imgs['orig']['path']);
// Создаем миниатюру изображения
function imageresize($infile, $outfile, $neww, $newh, $mime, $quality) {
    if ($mime == "image/jpeg") {
        $im=imagecreatefromjpeg($infile);
    } else {
        $im=imagecreatefrompng($infile);
    }
    
    $im1=imagecreatetruecolor($neww,$newh);
    imagecopyresampled($im1,$im,0,0,0,0,$neww,$newh,imagesx($im),imagesy($im));

    if ($mime == "image/jpeg") {
        imagejpeg($im1, $outfile, $quality);
    } else {
        imagealphablending($im1, false);
        imagesavealpha($im1, true);
        imagepng($im1, $outfile, 9);
    }
    imagedestroy($im);
    imagedestroy($im1);
}


// Конвертируем изображение
$whRatioCanvas = $__config['canvas']['width'] / $__config['canvas']['height'];
$whRatioImage = $fileInfo[0] / $fileInfo[1];

if ($whRatioCanvas < $whRatioImage ) {
    // Масштабируем по ширине
    $newWidth = $__config['canvas']['width'];
    $newHeight = $newWidth / $whRatioImage;
} else {
    // Масштабируем по высоте
    $newHeight = $__config['canvas']['height'];
    $newWidth = $newHeight * $whRatioImage;
}

if ($newWidth <  $fileInfo[0] || $newHeight < $fileInfo[1] ) {
    imageresize( $imgs['orig']['path'], $imgs['min']['path'],
            $newWidth, $newHeight, $fileInfo["mime"], 60);
} else {
    copy($imgs['orig']['path'], $imgs['min']['path']);
}

// Формируем ответ
echo json_encode( array(
        'status' => 'success',
        'imgName' => $imgs['orig']['name'],
        'minName' => $imgs['min']['name'],
        'imgSize' => array (
                'width' => $fileInfo[0],
                'height' => $fileInfo[1]
            )            
        ), JSON_FORCE_OBJECT
    );
