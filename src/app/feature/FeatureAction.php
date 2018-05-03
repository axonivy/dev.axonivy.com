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
        $info = ReleaseInfoRepository::getLatest();
        return $this->container->get('view')->render($response, 'app/feature/feature.html', [
            'features' => self::getPromotedFeatures(),
            'newAndNoteworthyLink' => $info == null ? '' : $info->getDocProvider()->getNewAndNoteworthy()->getUrl()
        ]);
    }
    
    private static function getPromotedFeatures(): array
    {
        return json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'promoted-features.json'));
    }
}
