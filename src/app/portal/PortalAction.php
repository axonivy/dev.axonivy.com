<?php
namespace app\portal;

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use app\release\model\ReleaseInfoRepository;
use app\release\model\Variant;
use Slim\Exception\NotFoundException;
use app\market\Market;

use app\permalink\MavenArtifactRepository;

class PortalAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(Request $request, $response, $args) {        
        $version = $args['version'] ?? '';

        if (empty($version)) {            
            return $response->withRedirect('/market/portal');
        }

        $version = self::evaluatePortalVersion($version);

        $topic = $args['topic'] ?? '';
        if (empty($topic)) {
            return $response->withRedirect('/market/portal/' . $version);
        }

        if ($topic == 'doc') {
            return $response->withRedirect('/documentation/portal-guide/' . $version);
        }
        throw new NotFoundException($request, $response);        
    }

    private static function evaluatePortalVersion(String $version): String {        
        if ($version == 'dev' || $version == 'nightly' || $version == 'sprint') {
            return Market::getPortal()->getLatestVersion();
        }
        if ($version == 'latest') {
            return Market::getPortal()->getLatestVersionToDisplay();
        }
        return $version;
    }
}
