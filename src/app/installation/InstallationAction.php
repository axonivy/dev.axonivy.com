<?php
namespace app\installation;

use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use app\release\model\Variant;
use app\release\model\Version;
use app\util\Redirect;

class InstallationAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
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
        
        return $this->container->get('view')->render($response, 'app/installation/installation.html', [
            'downloadUrl' => $downloadUrl,
            'minorVersion' => $minorVersion,
            'title' => $title,
            'type' => $type,
            'product' => $product,
            'version' => $version
        ]);
    }
}
