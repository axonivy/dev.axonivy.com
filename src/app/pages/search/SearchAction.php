<?php
namespace app\pages\search;

use Slim\Views\Twig;

class SearchAction
{

    private Twig $view;

    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke($request, $response, $args)
    {
        return $this->view->render($response, 'search/search.twig');
    }
}
