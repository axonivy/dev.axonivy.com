<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;
use Slim\Http\Request;
use Slim\Http\Response;
use app\release\model\PermalinkHelper;

class PermalinkAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(Request $request, Response $response, array $args) {
        $version = $args['version'];    // nightly, sprint, stable
        $file = $args['file'];          // AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip
        
        $artifacts = [];
        switch ($version) {
            case 'nightly':
                $artifacts = ReleaseInfoRepository::getNightlyArtifacts();
                break;
            case 'sprint':
                $artifacts = ReleaseInfoRepository::getSprintArtifacts();
                break;
            case 'stable':
                $releaseInfo = ReleaseInfoRepository::getLatestReleaseInfo();
                if ($releaseInfo == null) {
                    throw new NotFoundException($request, $response);
                }
                $artifacts = $releaseInfo->getArtifacts();
                break;
            default:
                throw new NotFoundException($request, $response);
        }
        
        $artifact = PermalinkHelper::findArtifact($artifacts, $file);
        
        if ($artifact == null) {
            throw new NotFoundException($request, $response);
        }
        
        return $response->withRedirect($artifact->getDownloadUrl());
    }
    
}
