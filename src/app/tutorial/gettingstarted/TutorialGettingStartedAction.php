<?php
namespace app\tutorial\gettingstarted;

use Psr\Container\ContainerInterface;
use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\util\Redirect;

class TutorialGettingStartedAction
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, Response $response, $args)
    {
        if (! isset($args['name'])) {
            return Redirect::to($response, '/tutorial/getting-started/first-project/step-1');
        }

        $tutorial = TutorialRepository::getGettingStartedTutorial($args['name']);
        if ($tutorial == null) {
            throw new HttpNotFoundException($request);
        }

        $step = TutorialRepository::getGettingStartedTutorialStep($args['name'], $args['stepNr']);
        $nextVideoUrl = TutorialRepository::getGettingStartedTutorialNextVideoUrl($args['name'], $args['stepNr']);;

        return $this->container->get('view')->render($response, 'app/tutorial/gettingstarted/tutorial-getting-started.html', [
            'tutorial' => $tutorial,
            'step' => $step,
            'nextStepVideoUrl' => $nextVideoUrl,
            'currentStepNr' => $args['stepNr']
        ]);
    }
}
