<?php

namespace app\domain\util;

use Psr\Http\Message\ServerRequestInterface;

class CookieUtil
{
  public static function setCookieOfQueryParam(ServerRequestInterface $request, string $name): string {
    $viewer = $request->getQueryParams()[$name] ?? '';
    if (!empty($viewer)) {
      setcookie($name, $viewer);
    }
    return $viewer;
  }
}
