<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\RequestInterface;
use Slim\Http\Response;

class NightlyAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(RequestInterface $request, Response $response, $args) {
        if (isset($args['file'])) {
            $file = $args['file'];
            return $response->withRedirect('/'.IVY_NIGHTLY_RELEASE_DIR_RELATIVE.'/' . $file);
        }
        
        $releaseInfo = ReleaseInfoRepository::getLatestNightly();
        $artifacts = $releaseInfo->getNightlyArtifacts();
        
        return $this->container->get('view')->render($response, 'app/release/nightly.html', [
            'nightlyArtifacts' => $artifacts,
            'nightlyUrl' => BASE_URL . '/download/nightly',
            'nightlyUrlP2' => BASE_URL . '/download/nightly/p2'
        ]);
    }
    
}


