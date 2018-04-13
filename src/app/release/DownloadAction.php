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
        $leadingEdge = ReleaseInfoRepository::getLatestLeadingEdge($productName);
        $longTermSupport = ReleaseInfoRepository::getLatestLongTermSupport($productName);
        
        if ($leadingEdge == null) {
            $leadingEdge = $longTermSupport;
        }
        
        if ($leadingEdge == null) {
            return null;
        }
        
        return $leadingEdge->getMostMatchingVariantForCurrentRequest($productName);
    }
}
