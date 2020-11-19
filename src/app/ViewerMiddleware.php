<?php
namespace app;

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
        $viewer = $cookies['ivy-viewer'] ?? '';
        if ($viewer == 'designer') {
            $env = $this->view->getEnvironment();
            $env->addGlobal('hideHeader', true);
            $env->addGlobal('hideFooter', true);
        }
        return $handler->handle($request);
    }
}
