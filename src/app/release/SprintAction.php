<?php
namespace app\release;

use Psr\Container\ContainerInterface;

class SprintAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/release/sprint.html');
    }
}
