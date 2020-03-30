<?php
namespace app\pages\doc\redirect;

use Slim\Psr7\Response;
use app\domain\util\Redirect;
use app\domain\ReleaseInfoRepository;
use Slim\Exception\HttpNotFoundException;

/**
 * Redirects
 *  /doc/latest to /doc/8.0        -> latest LTS 
 *  /doc/8.0.latest to /doc/8.0    -> latest update release
 *
 * This is only for legacy links. Do not publish such links.
 */
class LegacyRedirectLatestDocVersion
{
    public function __invoke($request, Response $response, $args)
    {
        $version = $args['version'] ?? '';
        $path = $args['path'] ?? '';
        if (! empty($path)) {
            $path = '/' . $path;
        }

        if ($version == 'latest') {
            $lts = ReleaseInfoRepository::getLatestLongTermSupport();
            if ($lts == null) {
                throw new HttpNotFoundException($request);
            }
            return Redirect::to($response, $lts->getDocProvider()->getMinorUrl() . $path);
        }

        $version = substr($version, 0, 3);
        return Redirect::to($response, "/doc/$version" . $path);
    }
}
