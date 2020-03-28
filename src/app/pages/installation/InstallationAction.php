<?php
namespace app\pages\installation;

use Slim\Psr7\Request;
use Slim\Views\Twig;
use app\domain\Variant;
use app\domain\Version;
use app\domain\util\Redirect;

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
        
        $title = 'Install Axon.ivy Designer';
        if ($product == Variant::PRODUCT_NAME_ENGINE) {
            $title = 'Install Axon.ivy Engine';
            if ($type == Variant::TYPE_DEBIAN) {
              $title .= ' as Debian Package';
            }
            if ($type == Variant::TYPE_DOCKER) {
              $title .= ' as Docker Image';
            }
        }
        
        if ($type == Variant::TYPE_WINDOWS) {
            $title .= ' on Windows';
        }
        if ($type == Variant::TYPE_LINUX || $type == Variant::TYPE_ALL) {
            $title .= ' on Linux';
        }
        if ($type == Variant::TYPE_MAC) {
            $title .= ' on Mac';
        }
        
        return $this->view->render($response, 'installation/installation.twig', [
            'downloadUrl' => $downloadUrl,
            'minorVersion' => $minorVersion,
            'title' => $title,
            'type' => $type,
            'product' => $product,
            'version' => $version
        ]);
    }
}
