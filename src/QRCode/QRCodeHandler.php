<?php

namespace Comeen\QRCode\QRCode;

use ComeenPlay\SdkPhp\Handlers\SlideHandler;
use ComeenPlay\SdkPhp\Interfaces\ISlide;
use ComeenPlay\SdkPhp\Interfaces\IDisplay;

class QRCodeHandler extends SlideHandler
{
    public function fetch(ISlide $slide, IDisplay $display): void
    {
        $this->addSlide([
            'url' => $slide->getOption('url', ""),
            'description' => $slide->getOption('description', ""),
            'background_color' => $slide->getOption('background_color', "white"),
            'qrcode_color' => $slide->getOption('qrcode_color', "black")
        ]);
    }

    public function getValidations($options = null): array
    {
        return [
            'rules' => [
                'url' => ['required']
            ],
            'messages' => [
                'url.required' => ""
            ],
        ];
    }
}
