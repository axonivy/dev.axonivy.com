<?php
namespace app\pages\home;

use Psr\Container\ContainerInterface;

class HomeAction
{
    private $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'home/home.twig', [
            'features' => self::getPromotedFeatures()
        ]);
    }
    
    private static function getPromotedFeatures(): array {
        $jsonFile = __DIR__ . DIRECTORY_SEPARATOR . 'promoted-features.json';
        return json_decode(file_get_contents($jsonFile));
    }
}
