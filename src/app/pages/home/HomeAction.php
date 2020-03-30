<?php
namespace app\pages\home;

use Slim\Views\Twig;

class HomeAction
{
    private Twig $view;

    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke($request, $response, $args)
    {
        return $this->view->render($response, 'home/home.twig', [
            'features' => self::getPromotedFeatures()
        ]);
    }

    private static function getPromotedFeatures(): array
    {
        $jsonFile = __DIR__ . DIRECTORY_SEPARATOR . 'promoted-features.json';
        return json_decode(file_get_contents($jsonFile));
    }
}
