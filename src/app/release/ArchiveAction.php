<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use app\util\StringUtil;
use Slim\Exception\NotFoundException;

class ArchiveAction
{
    protected $container;
    
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }
    
    public function __invoke($request, $response, $args) {
        $availableReleaseInfos = ReleaseInfoRepository::getAvailableReleaseInfos();
        $availableReleaseInfos = array_reverse($availableReleaseInfos);
        
        // determine all available major versions
        $majorVersions = [];
        foreach ($availableReleaseInfos as $releaseInfo) {
            if (!in_array($releaseInfo->getVersion()->getMajorVersion(), $majorVersions)) {
                $majorVersions[] = $releaseInfo->getVersion()->getMajorVersion();
            }
        }
        
        // determine current major version to show on the ui
        $version = '';
        if (isset($args['version'])) {
            $version = $args['version'];
            if (!in_array($version, $majorVersions)) {
                throw new NotFoundException($request, $response);
            }
        } else {
            if (count($majorVersions) > 0) {
                $version = $majorVersions[0];
            } else {
                throw new NotFoundException($request, $response);
            }
        }
        
        // determine all release infos for the current major version
        $releaseInfos = [];
        foreach ($availableReleaseInfos as $releaseInfo) {
            if (StringUtil::startsWith($releaseInfo->getVersion()->getVersionNumber(), $version)) {
                $releaseInfos[] = $releaseInfo;
            }
        }
        
        return $this->container->get('view')->render($response, 'app/release/archive.html', [
            'releaseInfos' => $releaseInfos,
            'majorVersions' => $majorVersions,
            'currentMajorVersion' => $version
        ]);
    }
}
