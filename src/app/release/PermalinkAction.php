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

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(Request $request, Response $response, array $args) {
        $version = $args['version'];    // nightly, sprint, latest
        $file = $args['file'];          // AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip
        
        $artifacts = [];
        switch ($version) {
            case 'nightly':
                $artifacts = ReleaseInfoRepository::getNightlyArtifacts();
                break;
            case 'sprint':
                $artifacts = ReleaseInfoRepository::getSprintArtifacts();
                break;
            case 'dev':
                $artifacts = ReleaseInfoRepository::getDevArtifacts();
                break;
            case 'latest':
                $releaseInfo = ReleaseInfoRepository::getLatest();
                if ($releaseInfo == null) {
                    throw new NotFoundException($request, $response);
                }
                $artifacts = $releaseInfo->getArtifacts();
                break;
            default:
                throw new NotFoundException($request, $response);
        }
        
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
