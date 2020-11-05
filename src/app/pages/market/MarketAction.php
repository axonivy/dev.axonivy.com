<?php
namespace app\pages\market;

use Slim\Views\Twig;
use app\domain\market\Market;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class MarketAction
{

    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke(Request $request, Response $response, $args)
    {
        $queryParams = $request->getQueryParams();
        $searchQuery = $queryParams['search'] ?? '';
        return $this->view->render($response, 'market/market.twig', [
            'products' => Market::search(Market::listed(), $searchQuery),
            'searchQuery' => $searchQuery
        ]);
    }
}
