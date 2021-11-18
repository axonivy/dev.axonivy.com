<?php
namespace app\pages\market;

use Slim\Psr7\Request;
use app\domain\util\Redirect;

class MarketProductLogoRedirector
{
  public function __invoke(Request $request, $response, $args)
  {
    $key = $args['key'] ?? '';
    return Redirect::to($response, "/_market/$key/logo.png");
  }
}
