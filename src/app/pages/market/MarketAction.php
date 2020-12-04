<?php

namespace app\pages\market;

use Slim\Views\Twig;
use app\domain\market\Market;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use app\domain\util\StringUtil;

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
    $selectedTags = $queryParams['type'] ?? '';

    $listedProducts = Market::listed();

    $tags = Market::tags($listedProducts);
    array_unshift($tags);

    $filteredProducts = Market::search($listedProducts, $searchQuery);
    $filteredProducts = Market::searchByTag($filteredProducts, explode(",", $selectedTags));

    $filterSet = !empty($searchQuery) || !empty($selectedTags);

    return $this->view->render($response, 'market/market.twig', [
      'products' => $filteredProducts,
      'searchQuery' => $searchQuery,
      'tags' => $tags,
      'selectedTags' => $selectedTags,
      'filterSet' => $filterSet
    ]);
  }
}
