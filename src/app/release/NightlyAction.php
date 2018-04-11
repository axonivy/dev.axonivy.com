<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\RequestInterface;

class NightlyAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(RequestInterface $request, $response, $args) {
        $releaseInfo = ReleaseInfoRepository::getLatestNightly();
        $artifacts = $releaseInfo->getNightlyArtifacts();
        
        // TODO Check p2 url
        
        return $this->container->get('view')->render($response, 'app/release/nightly.html', [
            'nightlyArtifacts' => $artifacts,
            'nightlyUrl' => BASE_URL . '/download/nightly',
            'nightlyUrlP2' => BASE_URL . '/download/nightly/p2'
        ]);
    }
    
}


