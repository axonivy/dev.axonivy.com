<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use Slim\Http\Response;

class LegacyDocAction
{
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, Response $response, $args)
    {
        return $this->container->get('view')->render($response, 'app/doc/redirect.html');
    }
}
