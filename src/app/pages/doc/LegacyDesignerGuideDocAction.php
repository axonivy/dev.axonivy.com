<?php
namespace app\pages\doc;

use Slim\Psr7\Response;
use Slim\Views\Twig;
use app\domain\util\Redirect;

class LegacyDesignerGuideDocAction
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
            return Redirect::to($response, 'designer-guide/');
        }
        
        $redirectUrl = $this->getRedirectUrl($doc);        
        return $this->view->render($response, 'doc/redirect-designer-guide.twig', ['redirectUrl' => $redirectUrl]);
    }

    private function getRedirectUrl($doc)
    {
        $htmlDocument = $doc ?? 'index.html';
        $redirects = [
            'index.html' => '/',
            'ivy.introduction.html' => 'introduction/',
            'ivy.processmodeling.html' => 'process-modeling/',
            'ivy.datamodeling.html' => 'data-modeling/',
            'ivy.ivyscript.html' => 'ivyscript/',
            'ivy.cms.html' => 'cms/',
            'ivy.userinterface.html' => 'user-interface/',
            'ivy.integration.html' => '3rd-party-integration/',
            'ivy.configuration.html' => 'configuration/',
            'ivy.concepts.html' => 'concepts/',
            'ivy.troubleshooting.html' => 'troubleshooting/',
            'ivy.references.html' => 'reference/'
        ];
        $newPage = $redirects[$htmlDocument] ?? '';
        return '../designer-guide/' . $newPage;
    }
}
