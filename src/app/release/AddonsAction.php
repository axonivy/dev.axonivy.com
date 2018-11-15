<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use app\permalink\MavenArtifact;

class AddonsAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/release/addons.html', [
            'projectDemos' => MavenArtifact::getProjectDemos(),
            'workflowUis' => MavenArtifact::getWorkflowUis()
        ]);
    }
}
