<?php
namespace app\pages\community;

use Slim\Views\Twig;

class CommunityAction
{

    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke($request, $response, $args)
    {
        return $this->view->render($response, 'community/community.twig');
    }
}
