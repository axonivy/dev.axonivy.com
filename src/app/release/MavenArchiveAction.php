<?php 
namespace app\release;

use Psr\Container\ContainerInterface;
use app\release\model\Variant;
use app\release\model\ReleaseInfo;

class MavenArchiveAction
{
    protected $container;
    
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }
    
    public function __invoke($request, $response, $args) {
        $releaseInfos = ReleaseInfoRepository::getAvailableReleaseInfosByProductName(Variant::PRODUCT_NAME_ENGINE);
        $releaseInfos = array_reverse($releaseInfos);
        $releaseInfos = array_filter($releaseInfos, function(ReleaseInfo $info) {
            return $info->getVersion()->isEqualOrGreaterThan(MAVEN_SUPPORTED_RELEASES_SINCE_VERSION);
        });
        
        return $this->container->get('view')->render($response, 'app/release/mavenArchive.html', ['releaseInfos' => $releaseInfos]);
    }
}
