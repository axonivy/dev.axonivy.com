<?php
namespace app\pages\doc\redirect;

use Slim\Psr7\Response;
use app\domain\util\Redirect;
use Slim\Exception\HttpNotFoundException;

class RedirectPortalGuide
{
  public function __invoke($request, Response $response, $args)
  {
    $version = $args['version'] ?? '';
    if (empty($version)) {
      throw new HttpNotFoundException($request, 'version not set');
    }
    
    $path = $args['path'] ?? '';
    if (!empty($path)) {
      $path = '/' . $path;
    }
    $url = "https://market.axonivy.com/portal/" . $version . '/doc' . $path;
    return Redirect::to($response, $url);
  }
}
