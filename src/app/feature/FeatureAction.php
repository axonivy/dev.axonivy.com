<?php
namespace app\feature;

use Psr\Container\ContainerInterface;

class FeatureAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/feature/feature.html', [
            'features' => FeatureRepository::getPromotedFeatures()
        ]);
    }
}
