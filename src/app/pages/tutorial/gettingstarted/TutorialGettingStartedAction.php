<?php
namespace app\pages\tutorial\gettingstarted;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\domain\util\Redirect;
use Slim\Views\Twig;

class TutorialGettingStartedAction
{

    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
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

        return $this->view->render($response, 'tutorial/gettingstarted/tutorial-getting-started.twig', [
            'tutorial' => $tutorial,
            'step' => $step,
            'nextStepVideoUrl' => $nextVideoUrl,
            'currentStepNr' => $args['stepNr']
        ]);
    }
}
