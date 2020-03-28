<?php 
namespace app\pages\download\maven;

use Slim\Views\Twig;
use app\domain\ReleaseInfo;
use app\domain\ReleaseInfoRepository;
use app\domain\Variant;

class MavenArchiveAction
{
    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }
    
    public function __invoke($request, $response, $args) {
        $releaseInfos = ReleaseInfoRepository::getAvailableReleaseInfosByProductName(Variant::PRODUCT_NAME_ENGINE);
        $releaseInfos = array_reverse($releaseInfos);
        $releaseInfos = array_filter($releaseInfos, function(ReleaseInfo $info) {
            return $info->getVersion()->isEqualOrGreaterThan(MAVEN_SUPPORTED_RELEASES_SINCE_VERSION);
        });
        
        return $this->view->render($response, 'download/maven/maven.twig', ['releaseInfos' => $releaseInfos]);
    }
}
