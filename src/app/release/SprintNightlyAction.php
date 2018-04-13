<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;
use app\release\model\PermalinkHelper;
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
            $artifacts = ReleaseInfoRepository::getLatestNightly()->getNightlyArtifacts();
            $name = 'Nightly Build';
            $urlVersion = 'nightly';
        } else if ($version == 'sprint-release') {
            $artifacts = ReleaseInfoRepository::getSprintRelease()->getSprintArtifacts();
            $name = 'Sprint Release';
            $urlVersion = 'sprint';
        } else {
            throw new \InvalidArgumentException($version . ' is not supported');
        }
        
        if (isset($args['file'])) {
            return self::handleArtifactRequest($request, $response, $args['file'], $artifacts, $urlVersion);
        }
        
        $baseUrl = UrlHelper::getFullPathUrl($request);
        return $this->container->get('view')->render($response, 'app/release/sprint-nightly.html', [
            'artifacts' => $artifacts,
            'name' => $name,
            'currentUrl' => $baseUrl,
            'p2Url' => $baseUrl . '/p2'
        ]);
    }
    
    private static function handleArtifactRequest($request, $response, $file, array $artifacts, string $urlVersion): ?Response
    {
        $artifact = PermalinkHelper::findArtifact($artifacts, $file);
        if ($artifact == null) {
            return $response->withRedirect('/releases/ivy/' . $urlVersion . '/' . $file);
        }
        return $response->withRedirect($artifact->getDownloadUrl());
    }
    
}


