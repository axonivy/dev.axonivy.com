<?php
namespace app\support;

use Psr\Container\ContainerInterface;

class SupportAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/support/support.html');
    }
}
