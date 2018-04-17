<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use app\release\model\ReleaseInfoRepository;
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
        $p2Url = '';
        if ($version == 'nightly') {
            $artifacts = ReleaseInfoRepository::getNightlyArtifacts();
            $name = 'Nightly Build';
            $urlVersion = 'nightly';
            $p2Url = 'https://file.axonivy.rocks/p2/nightly/';
        } else if ($version == 'sprint-release') {
            $artifacts = ReleaseInfoRepository::getSprintArtifacts();
            $name = 'Sprint Release';
            $urlVersion = 'sprint';
            $p2Url = 'https://file.axonivy.rocks/p2/sprint/';
        } else {
            throw new \InvalidArgumentException($version . ' is not supported');
        }
        
        $baseUrl = UrlHelper::getFullPathUrl($request);
        return $this->container->get('view')->render($response, 'app/release/sprint-nightly.html', [
            'artifacts' => $artifacts,
            'name' => $name,
            'currentUrl' => $baseUrl,
            'p2Url' => $p2Url
        ]);
    }
    
}


