<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use Slim\Http\Response;

class LegacyDocAction
{
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, Response $response, $args)
    {
        $htmlDocument = $args['htmlDocument'] ?? 'index.html';
        $redirects = [
            'index.html' => '/',
            'introduction.html' => 'introduction/',
            'gettingstarted.html' => 'getting-started/',
            'installation.html' => 'installation/',
            'configuration.html' => 'configuration/',
            'security.html' => 'security/',
            'integration.html' => 'integration/',
            'administration.html' => 'administration/',
            'monitoring.html' => 'monitoring/',
            'tools.html' => 'tool-reference/',
            'troubleshooting.html' => 'troubleshooting/'
        ];
        $newPage = $redirects[$htmlDocument] ?? '';
        $redirectUrl = '../engine-guide/' . $newPage;
        
        return $this->container->get('view')->render($response, 'app/doc/redirect.html', ['redirectUrl' => $redirectUrl]);
    }
}
