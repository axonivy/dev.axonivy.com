<?php
namespace app\store;

use Psr\Container\ContainerInterface;

class StoreAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/store/store.html', ['products' => Store::getAll()]);
    }
}
