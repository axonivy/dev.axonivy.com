<?php
namespace app\permalink;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Request;
use app\domain\market\Market;
use app\domain\util\Redirect;
use app\domain\util\StringUtil;

class PortalPermalinkAction
{

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

        if (self::isMinorVersion($version)) {
            $portalVersions = Market::getPortal()->getVersionsToDisplay();
            foreach ($portalVersions as $v) {
                if (StringUtil::startsWith($v, $version)) {
                    return $v;
                }
            }
        }
        return $version;
    }
    
    private static function isMinorVersion($version)
    {
       $count = substr_count($version, '.');
       return $count == 1;
    }
}
