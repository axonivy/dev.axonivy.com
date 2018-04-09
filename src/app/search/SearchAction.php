<?php
namespace app\search;

use Psr\Container\ContainerInterface;

class SearchAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/search/search.html');
    }
}
