<?php
namespace app\tutorial;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;

class TutorialGettingStartedAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        if (!isset($args['name'])) {
            return $response->withStatus(302)->withHeader('Location', '/tutorial/getting-started/first-project/step-1');
        }
        
        $tutorial = TutorialRepository::getGettingStartedTutorial($args['name']);
        $step = TutorialRepository::getGettingStartedTutorialStep($args['name'], $args['stepNr']);
        $nextVideoUrl = TutorialRepository::getGettingStartedTutorialNextVideoUrl($args['name'], $args['stepNr']);;
        if ($tutorial == null) {
            throw new NotFoundException($request, $response);
        }
        return $this->container->get('view')->render($response, 'app/tutorial/tutorial-getting-started.html', [
            'tutorial' => $tutorial,
            'step' => $step,
            'nextStepVideoUrl' => $nextVideoUrl,
            'currentStepNr' => $args['stepNr']
        ]);
    }
}
