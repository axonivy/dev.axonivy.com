<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use Slim\Psr7\Response;
use app\util\Redirect;

/**
 * Redirects
 *  /doc/8.0.latest to /doc/8.0
 *
 * This is only for legacy links. Do not publish such links.
 */
class RedirectLatestDocVersion
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, Response $response, $args)
    {
        $version = $args['version'];
        $path = $args['path'];
        if (! empty($path)) {
            $path = '/' . $path;
        }
        $version = substr($version, 0, 3);
        return Redirect::to($response, "/doc/$version" . $path);
    }
}
