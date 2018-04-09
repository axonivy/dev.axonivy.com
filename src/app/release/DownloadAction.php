<?php
namespace app\release;

use Psr\Container\ContainerInterface;

class DownloadAction
{
    protected $container;
    
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }
    
    public function __invoke($request, $response, $args) {
        //$releaseInfoLeadingEdge = ReleaseInfoRepository::getLatestLeadingEdge(Variant::PRODUCT_NAME_DESIGNER);
        ///$releaseInfoLongTermSupport = ReleaseInfoRepository::getLatestLongTermSupport(Variant::PRODUCT_NAME_DESIGNER);
        //echo $releaseInfoLeadingEdge->getDocumentReleaseNote();
        return $this->container->get('view')->render($response, 'app/release/download.html');
    }
}
