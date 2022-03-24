<?php

namespace app;

use app\domain\util\CookieUtil;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Views\Twig;

class ViewerMiddleware implements MiddlewareInterface
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
  {
    $cookies = $request->getCookieParams();
    CookieUtil::setCookieOfQueryParam($request, 'ivy-version');
    $viewer = $cookies['ivy-viewer'] ?? CookieUtil::setCookieOfQueryParam($request, 'ivy-viewer');
    if ($viewer == 'designer-market') {
      $env = $this->view->getEnvironment();
      $env->addGlobal('hideHeader', true);
      $env->addGlobal('hideFooter', true);
      $env->addGlobal('toogleInstallByDefault', true);
    }
    return $handler->handle($request);
  }
}
