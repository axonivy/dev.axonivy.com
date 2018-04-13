<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use app\util\StringUtil;
use Slim\Exception\NotFoundException;
use app\release\model\SprintArtifact;
use app\release\model\ReleaseInfo;

class SprintReleaseAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        $releaseInfo = ReleaseInfoRepository::getSprintRelease();
        
        if (isset($args['file'])) {
            $res = $this->handleArtifactRequest($request, $response, $args['file'], $releaseInfo);
            if ($res != null) {
                return $res;
            }
            return $response->withRedirect(CDN_HOST . '/sprint/' . $args['file']);
        }
        
        $baseUrl = BASE_URL . '/download/sprint-release';
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


