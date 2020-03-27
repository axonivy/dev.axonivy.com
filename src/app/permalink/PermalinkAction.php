<?php
namespace app\permalink;

use Psr\Container\ContainerInterface;
use app\release\model\Artifact;
use app\release\model\ReleaseInfoRepository;
use app\util\StringUtil;
use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\util\Redirect;

class PermalinkAction
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

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
