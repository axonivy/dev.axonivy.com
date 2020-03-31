<?php
namespace app\pages\doc\redirect;

use Slim\Psr7\Response;
use app\domain\util\Redirect;
use Slim\Psr7\Request;

class LegacyPublicAPIAction
{
    public function __invoke(Request $request, Response $response, $args)
    {
        $requestUri = $request->getUri()->__toString();
        $newUri = str_replace('PublicAPI', 'public-api', $requestUri);
        return Redirect::to($response, $newUri);
    }
}
