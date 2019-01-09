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
        
        if ($version == 'sprint-release') {
            $version = 'sprint';
        }
        
        $artifacts = ReleaseInfoRepository::getArtifacts($version);
        $name = '';
        $p2Url = '';
        $testingPurpose = true;
        $dockerImage = 'axonivy/axonivy-engine';
        
        if ($version == 'nightly') {
            $name = 'Nightly Build';
            $p2Url = 'https://file.axonivy.rocks/p2/nightly/';
            $dockerImage .= ':' . $version;
        } else if ($version == 'dev') {
            $name = 'Dev Build';
            $p2Url = '';
            $dockerImage .= ':' . $version;
        } else if ($version == 'sprint') {
            $name = 'Sprint Release';
            $p2Url = 'https://file.axonivy.rocks/p2/sprint/';
            $dockerImage .= ':' . $version;
        } else if ($version == 'latest') {
            $name = 'Latest Release';
            $testingPurpose = false;
        } else {
            throw new \InvalidArgumentException($version . ' is not supported');
        }
        
        $baseUrl = UrlHelper::getFullPathUrl($request);
        return $this->container->get('view')->render($response, 'app/release/sprint-nightly.html', [
            'artifacts' => $artifacts,
            'name' => $name,
            'currentUrl' => $baseUrl,
            'p2Url' => $p2Url,
            'testingPurpose' => $testingPurpose,
            'dockerImage' => $dockerImage
        ]);
    }
    
}


