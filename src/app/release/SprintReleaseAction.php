<?php
namespace app\release;

use Psr\Container\ContainerInterface;

class SprintReleaseAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        $releaseInfo = ReleaseInfoRepository::getSprintRelease();
        $artifacts = $releaseInfo->getSprintArtifacts();
        return $this->container->get('view')->render($response, 'app/release/sprint-release.html', ['sprintName' => $releaseInfo->getVersion()->getVersionNumber(), 'sprintArtifacts' => $artifacts]);
    }
}


