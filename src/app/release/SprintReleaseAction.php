<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use app\release\model\ReleaseInfo;
use app\release\model\SprintArtifact;
use app\util\StringUtil;

class SprintReleaseAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(Request $request, $response, $args) {
        $releaseInfo = ReleaseInfoRepository::getSprintRelease();
        
        if (isset($args['file'])) {
            $res = $this->handleArtifactRequest($request, $response, $args['file'], $releaseInfo);
            if ($res != null) {
                return $res;
            }
            return $response->withRedirect('/releases/ivy/sprint/' . $args['file']);
        }
        
        $baseUrl = $request->getUri()->getScheme() . '://' . $request->getUri()->getHost() . dirname($request->getUri()->getPath()) . basename($request->getUri()->getPath(), '.html');
        return $this->container->get('view')->render($response, 'app/release/sprint-release.html', [
            'releaseInfo' => $releaseInfo,
            'sprintUrl' => $baseUrl,
            'sprintUrlP2' => $baseUrl . '/p2'
        ]);
    }
    
    private function handleArtifactRequest($request, $response, $file, ReleaseInfo $releaseInfo)
    {
        $artifacts = $releaseInfo->getSprintArtifacts();

        $artifact = null;
        
        // check permalink request
        if (preg_match('/AxonIvy(.+)-latest(.+)/', $file)) {
            $artifact = $this->getSprintArtifactForPermalink($artifacts, $file);
        } else {
            foreach ($artifacts as $art) {
                if ($art->getFileName() == $file) {
                    $artifact = $art;
                }
            }
        }

        if ($artifact == null) {
            return null;
        }
        
        return $response->withRedirect($artifact->getDownloadUrl());
    }
    
    private function getSprintArtifactForPermalink($artifacts, $file): ?SprintArtifact
    {
        $startsAndEndsWith = explode('-latest', $file);
        $startsWith = $startsAndEndsWith[0];
        $endsWith = $startsAndEndsWith[1];
        
        foreach ($artifacts as $artifact) {
            if (StringUtil::startsWith($artifact->getFileName(), $startsWith)) {
                if (StringUtil::endsWith($artifact->getFileName(), $endsWith)) {
                    return $artifact;
                }
            }
        }
        
        return null;
    }
}


