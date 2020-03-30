<?php
namespace app\pages\installation;

use Slim\Psr7\Request;
use Slim\Views\Twig;
use app\domain\Version;
use app\domain\util\Redirect;
use app\domain\Artifact;

class InstallationAction
{
    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke(Request $request, $response, $args) {
        $product = $request->getQueryParams()['product'] ?? ''; // e.g. 'engine', 'designer'
        $type = $request->getQueryParams()['type'] ?? ''; // e.g. 'docker', 'debian'
        $version = $request->getQueryParams()['version'] ?? ''; // e.g. '8.0.1', '9.0.1'
        $downloadUrl = $request->getQueryParams()['downloadUrl'] ?? ''; // e.g. https://download/... -> case of docker empty!
        
        if (empty($product) || empty($version) || empty($type))
        {
           return Redirect::to($response, '/download');
        }
        
        $minorVersion = (new Version($version))->getMinorVersion();
        $bugfixVersion = (new Version($version))->getBugfixVersion();
        
        // TODO we should move this to artifact
        $title = 'Install Axon.ivy Designer';
        if ($product == Artifact::PRODUCT_NAME_ENGINE) {
            $title = 'Install Axon.ivy Engine';
            if ($type == Artifact::TYPE_DEBIAN) {
              $title .= ' Debian';
            }
            if ($type == Artifact::TYPE_DOCKER) {
              $title .= ' Docker';
            }
        }
        
        if ($type == Artifact::TYPE_WINDOWS) {
            $title .= ' Windows';
        }
        if ($type == Artifact::TYPE_LINUX || $type == Artifact::TYPE_ALL) {
            $title .= ' Linux';
        }
        if ($type == Artifact::TYPE_MAC) {
            $title .= ' Mac';
        }

        return $this->view->render($response, 'installation/installation.twig', [
            'downloadUrl' => $downloadUrl,
            'minorVersion' => $minorVersion,
            'title' => $title,
            'type' => $type,
            'product' => $product,
            'bugfixVersion' => $bugfixVersion
        ]);
    }
}
