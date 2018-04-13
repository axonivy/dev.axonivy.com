<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use app\util\UrlHelper;

class SprintNightlyAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(Request $request, $response, $args) {
        $version = $args['version'];
        
        $artifacts = [];
        $name = '';
        $urlVersion = '';
        if ($version == 'nightly') {
            $artifacts = ReleaseInfoRepository::getNightlyArtifacts();
            $name = 'Nightly Build';
            $urlVersion = 'nightly';
        } else if ($version == 'sprint-release') {
            $artifacts = ReleaseInfoRepository::getSprintArtifacts();
            $name = 'Sprint Release';
            $urlVersion = 'sprint';
        } else {
            throw new \InvalidArgumentException($version . ' is not supported');
        }
        
        if (isset($args['file'])) {
            return $response->withRedirect('/releases/ivy/' . $urlVersion . '/' . $args['file']);
        }
        
        $baseUrl = UrlHelper::getFullPathUrl($request);
        return $this->container->get('view')->render($response, 'app/release/sprint-nightly.html', [
            'artifacts' => $artifacts,
            'name' => $name,
            'currentUrl' => $baseUrl,
            'p2Url' => $baseUrl . '/p2'
        ]);
    }
    
}


