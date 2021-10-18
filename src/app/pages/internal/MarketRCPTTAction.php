<?php
namespace app\pages\internal;

use Slim\Views\Twig;
use app\domain\market\Market;
use app\domain\market\Product;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Slim\Exception\HttpNotFoundException;

class MarketRCPTTAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke(Request $request, Response $response, $args)
  {
    $queryParams = $request->getQueryParams();
    $designerVersion = $queryParams['designerVersion'] ?? null;

    if ($designerVersion == null) {
        throw new HttpNotFoundException($request);
    }

    $products = self::products();
    $baseUrl = self::baseUrl();

    $urls = [];
    foreach ($products as $product) {
        $mavenInfo = $product->getMavenProductInfo();
        $bestMatchingVersion = $mavenInfo->findBestMatchingVersion($designerVersion);
        $urls[] = $baseUrl . $product->getMetaUrl($bestMatchingVersion);
    }

    $response = $response->withHeader('Content-Type', 'text/plain');
    return $this->view->render($response, 'internal/market-rcptt.twig', [
      'urls' => $urls
    ]);
  }

  private static function products(): array {
    $products = Market::listed();
    $products = array_filter($products, fn (Product $product) => $product->getMavenProductInfo() != null);
    $products = array_filter($products, fn (Product $product) => $product->isInstallable());
    $products = array_filter($products, fn (Product $product) => $product->toValidate());
    return $products;
  }

  private static function baseUrl(): string {
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    return (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$host";
  }
}
