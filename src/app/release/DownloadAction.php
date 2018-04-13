<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use app\release\model\ReleaseInfoRepository;
use app\release\model\Variant;

class DownloadAction
{
    protected $container;
    
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }
    
    public function __invoke($request, $response, $args) {
        $designerVariant = $this->findVariant(Variant::PRODUCT_NAME_DESIGNER);
        $engineVariant = $this->findVariant(Variant::PRODUCT_NAME_ENGINE);
        
        return $this->container->get('view')->render($response, 'app/release/download.html', [
            'designerVariant' => $designerVariant,
            'engineVariant' => $engineVariant
        ]);
    }
    
    private function findVariant($productName): ?Variant {
        $releaseInfo = ReleaseInfoRepository::getLatestLeadingEdge($productName);
        
        if ($releaseInfo != null) {
            return $releaseInfo->getMostMatchingVariantForCurrentRequest($productName);
        }
         
        $releaseInfo = ReleaseInfoRepository::getLatestLongTermSupport($productName);
        if ($releaseInfo != null) {
            return $releaseInfo->getMostMatchingVariantForCurrentRequest($productName);
        }
        
        return null;
    }
}
