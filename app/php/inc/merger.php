<?php

class merger {
    // Объявляем переменные класса
    private $watermarkPath
            , $imagePath
            , $watermarkOfsetX
            , $watermarkOfsetY
            ;

    // Публичные методы
    public function setWatermarkImage($watermark) {
        if (file_exists($watermark)) {
            $this->watermarkPath = $watermark;
            return true;
        } else {
            return false;
        }
    }

    public function setImage($img) {
        if (file_exists($img)) {
            $this->imagePath = $img;
            return true;
        } else {
            return false;
        }
    }

    public function merge($margedImagePath) {
        return $this->_mergeSingleImg($margedImagePath);
    }

    // Приватные методы
    private function _mergeSingleImg($margedImagePath) {
        $watermarkInfo = getimagesize($this->watermarkPath);
        if ($watermarkInfo["mime"] == "image/png") {
            $watermark = imagecreatefrompng($this->watermarkPath);
        } else {
            $watermark = imagecreatefromjpeg($this->watermarkPath);
        }

        $imageInfo = getimagesize($this->imagePath);
        if ($imageInfo["mime"] == "image/png") {
            $image = imagecreatefrompng($this->imagePath);
        } else {
            $image = imagecreatefromjpeg($this->imagePath);
        }

        imagecopy($image, $watermark, $this->watermarkOfsetX,
            $this->watermarkOfsetY, 0, 0, $watermarkInfo[0], $watermarkInfo[1]);
        if ($imageInfo["mime"] == "image/png") {
            imagepng($image, $margedImagePath);
        } else {
            imagejpeg($image, $margedImagePath);
        }
        imagedestroy($image);
        imagedestroy($watermark);
        return true;
    }
}