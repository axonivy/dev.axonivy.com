<?php
namespace app\release;

use Psr\Container\ContainerInterface;

class NightlyAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        $releaseInfo = ReleaseInfoRepository::getLatestNightly();
        
        $variants = $releaseInfo->getVariants();
        if (count($variants) < 4) {
            $variants = [];
        }
        
        $nightlyArtifacts = [];
        foreach ($variants as $variant) {
            $artifact = new NightlyArtifact();
            $artifact->fileName = $variant->getFileName();
            $artifact->downloadUrl = CDN_HOST_DEV_RELEASES . '/ivy/nightly/current/' . $variant->getFileName();
            $nightlyArtifacts[] = $artifact;
        }
        
        return $this->container->get('view')->render($response, 'app/release/nightly.html', ['nightlyArtifacts' => $nightlyArtifacts]);
    }
    
}

class NightlyArtifact {
 
    public $downloadUrl;
    public $fileName;
    
}
