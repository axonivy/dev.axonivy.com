<?php
namespace app\pages\market;

use Slim\Views\Twig;
use app\domain\market\Market;
use Slim\Psr7\Request;

class MarketDesignerAction
{

    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke(Request $request, $response, $args)
    {
        $uri = $request->getUri();
        $baseUri = $uri->getScheme() . '://' . $uri->getHost();
        return $this->view->render($response, 'market/market-designer.twig', [
            'products' => Market::listed(),
            'baseUri' => $baseUri
        ]);
    }
}
