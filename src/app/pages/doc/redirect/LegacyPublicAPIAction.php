<?php
namespace app\pages\doc\redirect;

use Slim\Psr7\Response;
use app\domain\util\Redirect;

class LegacyPublicAPIAction
{
    public function __invoke($request, Response $response, $args)
    {
        $requestUri = $_SERVER['REQUEST_URI'];
        $newUri = str_replace('PublicAPI', 'public-api', $requestUri);
        return Redirect::to($response, $newUri);
    }
}
