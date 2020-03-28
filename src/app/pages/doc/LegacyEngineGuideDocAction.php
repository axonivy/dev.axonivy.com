<?php
namespace app\pages\doc;

use Psr\Container\ContainerInterface;
use Slim\Psr7\Response;
use app\domain\util\Redirect;

class LegacyEngineGuideDocAction
{
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, Response $response, $args)
    {
        $doc = $args['htmlDocument'];
        
        if (empty($doc))
        {
            return Redirect::to($response, 'engine-guide/');
        }
        
        $redirectUrl = $this->getRedirectUrl($doc);        
        return $this->container->get('view')->render($response, 'doc/redirect-engine-guide.twig', ['redirectUrl' => $redirectUrl]);
    }

    private function getRedirectUrl($doc)
    {
        $htmlDocument = $doc ?? 'index.html';
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
        return '../engine-guide/' . $newPage;
    }
}
