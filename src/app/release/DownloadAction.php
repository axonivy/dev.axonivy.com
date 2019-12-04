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
        $designerVariantLTS = $this->findVariantLTS(Variant::PRODUCT_NAME_DESIGNER);
        $designerVariantLE = $this->findVariantLE(Variant::PRODUCT_NAME_DESIGNER);
        if ($designerVariantLTS->getVersion() == $designerVariantLE->getVersion()) {
            $designerVariantLE = null;
        }
        
        $engineVariantLTS = $this->findVariantLTS(Variant::PRODUCT_NAME_ENGINE);
        $engineVariantLE = $this->findVariantLE(Variant::PRODUCT_NAME_ENGINE);
        if ($engineVariantLTS->getVersion() == $engineVariantLE->getVersion()) {
            $engineVariantLE = null;
        }
        
        $leadingEdgeReleaseInfo = ReleaseInfoRepository::getLatest();
        
        return $this->container->get('view')->render($response, 'app/release/download.html', [
            'designerVariantLE' => $designerVariantLE,
            'designerVariantLTS' => $designerVariantLTS,
            
            'engineVariantLE' => $engineVariantLE,
            'engineVariantLTS' => $engineVariantLTS,
            
            'leVersion' => $leadingEdgeReleaseInfo == null ? '' : $leadingEdgeReleaseInfo->getVersion()->getMinorVersion()
        ]);
    }
    
    private function findVariantLE($productName): ?Variant {
        $releaseInfo = ReleaseInfoRepository::getLatest();
        if ($releaseInfo != null) {
            return $releaseInfo->getMostMatchingVariantForCurrentRequest($productName);
        }
        return null;
    }
    
    private function findVariantLTS($productName): ?Variant {
        $releaseInfo = ReleaseInfoRepository::getLatestLongTermSupport();
        if ($releaseInfo != null) {
            return $releaseInfo->getMostMatchingVariantForCurrentRequest($productName);
        }
        return null;
    }
}
