<?php
namespace app\installation;

use Psr\Container\ContainerInterface;

class InstallationAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/installation/installation.html');
    }
}
