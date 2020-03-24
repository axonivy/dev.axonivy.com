<?php
namespace app\portal;

use Psr\Container\ContainerInterface;
use app\market\Market;
use Slim\Psr7\Request;
use Slim\Exception\HttpNotFoundException;
use app\util\Redirect;

class PortalAction
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke(Request $request, $response, $args)
    {
        $version = $args['version'] ?? '';

        if (empty($version)) {
            return Redirect::to($response, '/market/portal');
        }

        $version = self::evaluatePortalVersion($version);

        $topic = $args['topic'] ?? '';
        if (empty($topic)) {
            return Redirect::to($response, '/market/portal/' . $version);
        }

        if ($topic == 'doc') {
            return Redirect::to($response, '/documentation/portal-guide/' . $version);
        }
        throw new HttpNotFoundException($request);
    }

    private static function evaluatePortalVersion(String $version): String
    {
        if ($version == 'dev' || $version == 'nightly' || $version == 'sprint') {
            return Market::getPortal()->getLatestVersion();
        }
        if ($version == 'latest') {
            return Market::getPortal()->getLatestVersionToDisplay();
        }
        return $version;
    }
}
