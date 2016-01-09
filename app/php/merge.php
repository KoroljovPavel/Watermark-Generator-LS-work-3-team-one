<?php
session_start();
include_once("./config.php");

include_once("./inc/merger.php");

$wmMerger = new merger;

if (!$wmMerger->setWatermarkImage($__config['path']['imgUpload']
                . $_SESSION["uploads"]["watermark"]["tmpName"])) {
    
    echo json_encode( array(
        'status' => 'error',                 
        'errorId' => '1-2',
        'errorText' => 'Watermark file missing'           
        ), JSON_FORCE_OBJECT
    );     
    exit();  
}

if (!$wmMerger->setImage($__config['path']['imgUpload']
                . $_SESSION["uploads"]["img"]["tmpName"])) {
    
    echo json_encode( array(
        'status' => 'error',                 
        'errorId' => '1-3',
        'errorText' => 'Image file missing'           
        ), JSON_FORCE_OBJECT
    );     
    exit();  
}

if (!$wmMerger->setWatermarkTransparency(30)) {
    
    echo json_encode( array(
        'status' => 'error',                 
        'errorId' => '1-5',
        'errorText' => 'Invalid values of transparency'           
        ), JSON_FORCE_OBJECT
    );     
    exit();  
}

$wmMerger->setWatermarkOfsets(100, 300);

if (!$wmMerger->merge($__config['path']['imgUpload'] . "marged-"
                . $_SESSION["uploads"]["img"]["tmpName"])) {
    echo json_encode( array(
        'status' => 'error',                 
        'errorId' => '1-4',
        'errorText' => 'Failed to images merge'           
        ), JSON_FORCE_OBJECT
    );     
    exit();  
}

echo json_encode( array(
    'status' => 'success'          
    ), JSON_FORCE_OBJECT
);