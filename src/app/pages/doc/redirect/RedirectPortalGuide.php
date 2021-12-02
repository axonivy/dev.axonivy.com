<?php
namespace app\pages\doc\redirect;

use Slim\Psr7\Response;
use Slim\Views\Twig;
use app\domain\util\Redirect;
use app\domain\market\Market;
use app\permalink\PortalPermalinkAction;

class RedirectPortalGuide
{
  public function __invoke($request, Response $response, $args)
  {
    $version = $args['version'] ?? '';
    if (empty($version)) {
      throw new HttpNotFoundException($request, 'version not set');
    }

    $product = Market::getProductByKey('portal');
    $info = $product->getMavenProductInfo();
    $version = PortalPermalinkAction::evaluatePortalVersion($version, $info);

    $path = $args['path'] ?? '';
    return PortalPermalinkAction::redirectToDoc($path, $version, $response, $request);
  }
}
