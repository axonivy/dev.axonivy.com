<?php
namespace app\permalink;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\domain\Artifact;
use app\domain\ReleaseInfoRepository;
use app\domain\util\Redirect;
use app\domain\util\StringUtil;

class ProductPermalinkAction
{

    public function __invoke(\Slim\Psr7\Request $request, Response $response, array $args)
    {
        $version = $args['version']; // nightly, sprint, latest, 8.0
        $file = $args['file']; // axonivy-engine-slim.zip

        $artifacts = ReleaseInfoRepository::getArtifacts($version);
        $artifact = self::findArtifactForPermalink($artifacts, $file);
        
        if ($artifact == null) {
            throw new HttpNotFoundException($request);
        }

        return Redirect::to($response, $artifact->getDownloadUrl());
    }

    private static function findArtifactForPermalink($artifacts, $permalinkFile): ?Artifact
    {
        foreach ($artifacts as $artifact) {
            if (StringUtil::endsWith($artifact->getPermalink(), $permalinkFile)) {
                return $artifact;
            }
        }
        return null;
    }
}
