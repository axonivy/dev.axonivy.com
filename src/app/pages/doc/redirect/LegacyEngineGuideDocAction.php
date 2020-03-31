<?php
namespace app\pages\doc\redirect;

use Slim\Psr7\Response;
use Slim\Views\Twig;
use app\domain\util\Redirect;

class LegacyEngineGuideDocAction
{
    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke($request, Response $response, $args)
    {
        $doc = $args['htmlDocument'];
        
        if (empty($doc))
        {
            return Redirect::to($response, 'engine-guide/');
        }

        $redirectUrl = $this->getRedirectUrl($doc);        
        return $this->view->render($response, 'doc/redirect/redirect-engine-guide.twig', ['redirectUrl' => $redirectUrl]);
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
