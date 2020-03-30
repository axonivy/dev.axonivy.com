<?php
namespace app\pages\market;

use Slim\Views\Twig;
use app\domain\market\Market;

class MarketAction
{

    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke($request, $response, $args)
    {
        return $this->view->render($response, 'market/market.twig', [
            'products' => Market::getAll()
        ]);
    }
}
