<?php
namespace app\permalink;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\domain\ReleaseInfo;
use app\domain\ReleaseInfoRepository;
use app\domain\util\Redirect;
use Slim\Psr7\Request;

class ProductPermalinkAction
{

    public function __invoke(Request $request, Response $response, array $args)
    {
        $version = $args['version']; // nightly, sprint, dev, latest, 8.0, 8, 8.0.1
        $file = $args['file']; // axonivy-engine-slim.zip

        $releaseInfo = $this->findReleaseInfo($version);
        if ($releaseInfo == null) {
            throw new HttpNotFoundException($request);
        }

        $artifact = $releaseInfo->findArtifactByPermalinkFile($file);
        if ($artifact == null) {
            throw new HttpNotFoundException($request);
        }
        return Redirect::to($response, $artifact->getDownloadUrl());
    }

    private static function findReleaseInfo(string $version): ?ReleaseInfo
    {
        if ($version == 'latest') {
            return ReleaseInfoRepository::getLatestLongTermSupport();
        }
        return ReleaseInfoRepository::getBestMatchingVersion($version);
    }
}
