<?php
namespace app\market;

use Psr\Container\ContainerInterface;

class MarketAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/market/market.html', ['products' => Market::getAll()]);
    }
}
