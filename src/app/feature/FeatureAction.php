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
        $releaseInfoLE = ReleaseInfoRepository::getLatest();
        $releaseInfoLTS = ReleaseInfoRepository::getLatestLongTermSupport();
        return $this->container->get('view')->render($response, 'app/feature/feature.html', [
            'features' => self::getPromotedFeatures(),
            'leVersion' => $releaseInfoLE == null ? '' : $releaseInfoLE->getVersion()->getMinorVersion(),
            'ltsVersion' => $releaseInfoLTS == null ? '' : $releaseInfoLTS->getVersion()->getMinorVersion(),
            'newAndNoteworthyLink' => $releaseInfoLE == null ? '' : $releaseInfoLE->getDocProvider()->getOverviewUrl()
        ]);
    }
    
    private static function getPromotedFeatures(): array
    {
        return json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'promoted-features.json'));
    }
}
