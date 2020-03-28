<?php
namespace app\pages\tutorial;

use Slim\Views\Twig;

class TutorialAction
{

    private Twig $view;

    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke($request, $response, $args)
    {
        return $this->view->render($response, 'tutorial/tutorial.twig', [
            'tutorials' => self::getTutorials()
        ]);
    }

    private static function getTutorials(): array
    {
        return json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'tutorials.json'));
    }
}
