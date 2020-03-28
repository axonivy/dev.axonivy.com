<?php
namespace app\pages\market;

use Psr\Container\ContainerInterface;
use app\domain\market\Market;

class MarketAction
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args)
    {
        return $this->container->get('view')->render($response, 'market/market.twig', [
            'products' => Market::getAll()
        ]);
    }
}
