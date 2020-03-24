<?php
namespace app\util;

use Slim\Psr7\Request;

class UrlHelper
{
    public static function getFullPathUrl(Request $request): string
    {
        return $request->getUri()->getScheme() . '://' . $request->getUri()->getHost() . $request->getUri()->getPath();
    }
}