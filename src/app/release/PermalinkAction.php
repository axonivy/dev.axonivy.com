<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;
use Slim\Http\Request;
use Slim\Http\Response;
use app\release\model\Artifact;
use app\release\model\ReleaseInfoRepository;
use app\util\StringUtil;

class PermalinkAction
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke(Request $request, Response $response, array $args)
    {
        $version = $args['version']; // nightly, sprint, latest, 8.0
        $file = $args['file']; // axonivy-engine-slim.zip

        $artifacts = ReleaseInfoRepository::getArtifacts($version);
        $artifact = self::findArtifactForPermalink($artifacts, $file);
        
        if ($artifact == null) {
            throw new NotFoundException($request, $response);
        }

        return $response->withRedirect($artifact->getDownloadUrl());
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
