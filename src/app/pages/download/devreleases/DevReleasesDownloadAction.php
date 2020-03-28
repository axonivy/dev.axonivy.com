<?php
namespace app\pages\download\devreleases;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Request;
use Slim\Views\Twig;
use app\domain\ReleaseInfoRepository;
use app\domain\util\UrlHelper;

class DevReleasesDownloadAction
{
    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke(Request $request, $response, $args) {
        $version = $args['version'];
        
        $name = '';
        if ($version == 'nightly') {
            $name = 'Nightly Build';
        } else if ($version == 'sprint') {
            $name = 'Sprint Release';
        } else {
            throw new HttpNotFoundException($request);
        }

        $artifacts = ReleaseInfoRepository::getArtifacts($version);
        $baseUrl = UrlHelper::getFullPathUrl($request);
        return $this->view->render($response, 'download/devreleases/dev-releases-download.twig', [
            'artifacts' => $artifacts,
            'name' => $name,
            'currentUrl' => $baseUrl,
            'p2Url' => "https://file.axonivy.rocks/p2/$version/",
            'dockerImage' => "axonivy/axonivy-engine:$version"
        ]);
    }
}
