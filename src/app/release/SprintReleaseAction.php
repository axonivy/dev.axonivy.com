<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;
use app\release\model\PermalinkHelper;
use app\util\UrlHelper;

class SprintReleaseAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(Request $request, $response, $args) {
        $artifacts = ReleaseInfoRepository::getSprintRelease()->getSprintArtifacts();
        
        if (isset($args['file'])) {
            return self::handleArtifactRequest($request, $response, $args['file'], $artifacts);
        }
        
        $baseUrl = UrlHelper::getFullPathUrl($request);
        return $this->container->get('view')->render($response, 'app/release/sprint-nightly.html', [
            'artifacts' => $artifacts,
            'name' => 'Sprint Release',
            'currentUrl' => $baseUrl,
            'p2Url' => $baseUrl . '/p2'
        ]);
    }
    
    private static function handleArtifactRequest($request, $response, $file, array $artifacts): ?Response
    {
        $artifact = PermalinkHelper::findArtifact($artifacts, $file);
        if ($artifact == null) {
            return $response->withRedirect('/releases/ivy/sprint/' . $file);
        }
        return $response->withRedirect($artifact->getDownloadUrl());
    }
    
}
