<?php

class merger {
    // Объявляем переменные класса
    private   $watermarkPath
            , $imagePath
            , $watermarkOfsetX = 0
            , $watermarkOfsetY = 0
            , $tillingPaddingX = 0
            , $tillingPaddingY = 0
            , $watermarkTransparency = 0.3
            , $imageProcessLib = 'imagick'
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

    public function setWatermarkTransparency($transparency) {
        if (!is_float($transparency) ||
                $transparency < 0 || $transparency > 1) {
            return false;
        }
        $this->watermarkTransparency = (float) $transparency;
        return true;
    }

    public function setWatermarkOfsets($ofsetX, $ofsetY) {
        $this->setWatermarkOfsetX($ofsetX);
        $this->setWatermarkOfsetY($ofsetY);
    }

    public function setWatermarkOfsetX($ofsetX) {
        $this->watermarkOfsetX = $ofsetX;
    }

    public function setWatermarkOfsetY($ofsetY) {
        $this->watermarkOfsetY = $ofsetY;
    }

    public function merge($margedImagePath) {
        return $this->_mergeSingleImg($margedImagePath);
    }

    public function setTillingPadding($paddingX, $paddingY) {
        $this->setTillingPaddingX($paddingX);
        $this->setTillingPaddingY($paddingY);
    }

    public function setTillingPaddingX($paddingX) {
        $this->tillingPaddingX = $paddingX;
    }

    public function setTillingPaddingY($paddingY) {
        $this->tillingPaddingY = $paddingY;
    }

    public function tiling($margedImagePath) {

        switch ($this->imageProcessLib) {
            case 'gd':
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

                imagesavealpha($image, true);
                imagesavealpha($watermark, true);
                imagealphablending($image, true);
                imagealphablending($watermark, true);

                $imgInLine  = ceil($imageInfo[0] / 
                                       ($watermarkInfo[0] + $this->tillingPaddingX));
                $imgInCol   = ceil($imageInfo[1] /
                                       ($watermarkInfo[1] + $this->tillingPaddingY));

                for ($i = 0; $i < $imgInLine; $i++) { // цыкл движения по горизонтали
                    for ($j = 0; $j < $imgInCol; $j++) {  // Цыкл движения по вертикали 
                        imagecopymerge($image, $watermark,
                                $i * ($watermarkInfo[0] + $this->tillingPaddingX),
                                $j * ($watermarkInfo[1] + $this->tillingPaddingY),
                                0, 0, $watermarkInfo[0], $watermarkInfo[1],
                                $this->watermarkTransparency);
                    }
                }

                if ($imageInfo["mime"] == "image/png") {
                    imagepng($image, $margedImagePath);
                } else {
                    imagejpeg($image, $margedImagePath);
                }
                imagedestroy($image);
                imagedestroy($watermark);
                break;

            case 'imagick':

                break;

            default:
                echo json_encode( array(
                    'status' => 'error',
                    'errorId' => '1-6',
                    'errorText' => 'An invalid image processing library'
                    ), JSON_FORCE_OBJECT
                );
                exit();
                break;
        }

        return true;
    }

    // Приватные методы
    private function _mergeSingleImg($margedImagePath) {


        switch ($this->imageProcessLib) {
            case 'gd':
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

                imagesavealpha($image, true);
                imagesavealpha($watermark, true);
                imagealphablending($image, false);
                imagealphablending($watermark, false);

                imagecopy($image, $watermark, $this->watermarkOfsetX,
                    $this->watermarkOfsetY, 0, 0, $watermarkInfo[0], $watermarkInfo[1]);
                if ($imageInfo["mime"] == "image/png") {
                    imagepng($image, $margedImagePath);
                } else {
                    imagejpeg($image, $margedImagePath);
                }
                imagedestroy($image);
                imagedestroy($watermark);
                break;

            case 'imagick':
                $image = new Imagick();
                $image->readImage($this->imagePath);

                $watermark = new Imagick();
                $watermark->readImage($this->watermarkPath);

                if (!$watermark->getImageAlphaChannel()) {
                    $watermark->setImageAlphaChannel(1);
                }

                $watermark->evaluateImage(Imagick::EVALUATE_MULTIPLY, $this->watermarkTransparency,
                                                         Imagick::CHANNEL_ALPHA); 

                $image->compositeImage($watermark, imagick::COMPOSITE_OVER,
                                        $this->watermarkOfsetX, $this->watermarkOfsetY);

                $image->writeImage($margedImagePath);

                break;
            
            default:
                echo json_encode( array(
                    'status' => 'error',
                    'errorId' => '1-6',
                    'errorText' => 'An invalid image processing library'
                    ), JSON_FORCE_OBJECT
                );
                exit();
                break;
        }


        return true;
    }
}