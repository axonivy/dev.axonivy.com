<?php
namespace app\download\devreleases;

use Psr\Container\ContainerInterface;
use app\release\model\ReleaseInfoRepository;
use app\util\UrlHelper;
use Slim\Psr7\Request;
use Slim\Exception\HttpNotFoundException;

class DevReleasesDownloadAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
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
        return $this->container->get('view')->render($response, 'app/download/devreleases/dev-releases-download.html', [
            'artifacts' => $artifacts,
            'name' => $name,
            'currentUrl' => $baseUrl,
            'p2Url' => "https://file.axonivy.rocks/p2/$version/",
            'dockerImage' => "axonivy/axonivy-engine:$version"
        ]);
    }
}
