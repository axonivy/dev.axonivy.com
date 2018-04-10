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
        $artifacts = $releaseInfo->getNightlyArtifacts();
        return $this->container->get('view')->render($response, 'app/release/nightly.html', ['nightlyArtifacts' => $artifacts]);
    }
    
}


