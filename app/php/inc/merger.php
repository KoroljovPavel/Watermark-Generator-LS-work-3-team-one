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
                        imagecopy($image, $watermark,
                                $i * ($watermarkInfo[0] + $this->tillingPaddingX),
                                $j * ($watermarkInfo[1] + $this->tillingPaddingY),
                                0, 0, $watermarkInfo[0], $watermarkInfo[1]);
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
                $image = new Imagick();
                $image->readImage($this->imagePath);

                $watermark = new Imagick();
                $watermark->readImage($this->watermarkPath);

                if (!$watermark->getImageAlphaChannel()) {
                    $watermark->setImageAlphaChannel(1);
                }

                if ($watermark->getImageWidth() > $image->getImageWidth() 
                            || $watermark->getImageHeight() > $image->getImageHeight()) {
                    $kWidth = $watermark->getImageWidth() / $image->getImageWidth();
                    $kHeight = $watermark->getImageHeight() / $image->getImageHeight();

                    if ($kWidth > $kHeight) {
                        // Масштабируем по ширине
                        $watermark->scaleImage($watermark->getImageWidth() / $kWidth,
                                                $watermark->getImageHeight() / $kWidth);
                    } else {
                        // Масштабируем по высоте
                        $watermark->scaleImage($watermark->getImageWidth() / $kHeight,
                                                $watermark->getImageHeight() / $kHeight);
                    }
                }

                $watermark->evaluateImage(Imagick::EVALUATE_MULTIPLY, $this->watermarkTransparency,
                                                         Imagick::CHANNEL_ALPHA); 

                $imgInLine  = ceil($image->getImageWidth() / 
                            ($watermark->getImageWidth() + $this->tillingPaddingX)) + 2;
                $imgInCol   = ceil($image->getImageHeight() /
                            ($watermark->getImageHeight() + $this->tillingPaddingY)) + 2;

                $this->watermarkOfsetX = $this->watermarkOfsetX % 
                        ($watermark->getImageWidth() + $this->tillingPaddingX);

                $this->watermarkOfsetY = $this->watermarkOfsetY % 
                        ($watermark->getImageHeight() + $this->tillingPaddingY);

                $startOfsetX = (-2 * $image->getImageWidth() 
                % ($this->tillingPaddingX + $watermark->getImageWidth())) + $this->watermarkOfsetX;

                $startOfsetY = (-2 * $image->getImageHeight() 
                % ($this->tillingPaddingY + $watermark->getImageHeight())) + $this->watermarkOfsetY;

                for ($i = -1; $i < $imgInLine; $i++) { // цыкл движения по горизонтали
                    for ($j = -1; $j < $imgInCol; $j++) {  // Цыкл движения по вертикали 

                        $image->compositeImage($watermark, imagick::COMPOSITE_OVER,
                            $startOfsetX+($i * 
                                ($watermark->getImageWidth() + $this->tillingPaddingX)),
                            $startOfsetY+($j * 
                                ($watermark->getImageHeight() + $this->tillingPaddingY)));
                    }
                }

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

                if ($watermarkInfo[0] > $imageInfo[0] || $watermarkInfo[1] > $imageInfo[1]) {
                    $kWidth = $watermarkInfo[0] / $imageInfo[0];
                    $kHeight = $watermarkInfo[0] / $imageInfo[0];

                    if ($kWidth > $kHeight) {
                        // Масштабируем по ширине
                        $watermarkInfo[0] = $watermarkInfo[0] / $kWidth;
                        $watermarkInfo[1] = $watermarkInfo[1] / $kWidth;
                    } else {
                        // Масштабируем по высоте
                        $watermarkInfo[0] = $watermarkInfo[0] / $kHeight;
                        $watermarkInfo[1] = $watermarkInfo[1] / $kHeight;
                    }

                    imagecopyresampled($watermark,$watermark,0,0,0,0,$watermarkInfo[0],
                            $watermarkInfo[1],imagesx($watermark),imagesy($watermark));
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
                break;

            case 'imagick':
                $image = new Imagick();
                $image->readImage($this->imagePath);

                $watermark = new Imagick();
                $watermark->readImage($this->watermarkPath);

                if (!$watermark->getImageAlphaChannel()) {
                    $watermark->setImageAlphaChannel(1);
                }

                if ($watermark->getImageWidth() > $image->getImageWidth() 
                            || $watermark->getImageHeight() > $image->getImageHeight()) {
                    $kWidth = $watermark->getImageWidth() / $image->getImageWidth();
                    $kHeight = $watermark->getImageHeight() / $image->getImageHeight();

                    if ($kWidth > $kHeight) {
                        // Масштабируем по ширине
                        $watermark->scaleImage($watermark->getImageWidth() / $kWidth,
                                                $watermark->getImageHeight() / $kWidth);
                    } else {
                        // Масштабируем по высоте
                        $watermark->scaleImage($watermark->getImageWidth() / $kHeight,
                                                $watermark->getImageHeight() / $kHeight);
                    }
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