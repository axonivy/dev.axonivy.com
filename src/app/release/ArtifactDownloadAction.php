<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use app\release\model\ReleaseInfoRepository;
use app\util\UrlHelper;
use Slim\Psr7\Request;
use Slim\Exception\HttpNotFoundException;

class ArtifactDownloadAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(Request $request, $response, $args) {
        $version = $args['version'];
        
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
            throw new HttpNotFoundException($request);
        }

        $baseUrl = UrlHelper::getFullPathUrl($request);
        return $this->container->get('view')->render($response, 'app/release/artifact-download.html', [
            'artifacts' => $artifacts,
            'name' => $name,
            'currentUrl' => $baseUrl,
            'p2Url' => $p2Url,
            'testingPurpose' => $testingPurpose,
            'dockerImage' => $dockerImage
        ]);
    }
    
}


