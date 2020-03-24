<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use Slim\Psr7\Response;
use app\util\Redirect;

class LegacyPublicAPIAction
{
    protected $container;
    
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }
    
    public function __invoke($request, Response $response, $args)
    {
        $requestUri = $_SERVER['REQUEST_URI'];
        $newUri = str_replace('PublicAPI', 'public-api', $requestUri);
        return Redirect::to($response, $newUri);
    }
}
