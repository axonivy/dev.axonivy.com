<?php
namespace app\feature;

use Psr\Container\ContainerInterface;
use app\release\model\ReleaseInfoRepository;

class FeatureAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/feature/feature.html', [
            'features' => self::getPromotedFeatures()
        ]);
    }
    
    private static function getPromotedFeatures(): array {
        $jsonFile = __DIR__ . DIRECTORY_SEPARATOR . 'promoted-features.json';
        return json_decode(file_get_contents($jsonFile));
    }
}
