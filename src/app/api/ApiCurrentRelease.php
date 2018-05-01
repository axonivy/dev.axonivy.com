<?php
namespace app\api;

use app\release\model\ReleaseInfo;
use app\release\model\ReleaseInfoRepository;
use Slim\Http\Request;
use app\release\model\Version;
use app\util\StringUtil;
use app\util\ArrayUtil;

class ApiCurrentRelease
{
    protected $container;
    
    public function __construct($container) {
        $this->container = $container;
    }
    
    public function __invoke(Request $request, $response, $args) {
        $releaseVersion = $request->getQueryParams()['releaseVersion'] ?? '';
        $data = [
            'latestReleaseVersion' => $this->getLatestReleaseVersion(),
            'latestServiceReleaseVersion' => $this->getLatestServiceReleaseVersion($releaseVersion)
        ];
        return $response->withJson($data);
    }
    
    private function getLatestReleaseVersion(): string
    {
        $releaseInfo = ReleaseInfoRepository::getLatest();
        return $releaseInfo == null ? '' : $releaseInfo->getVersion()->getBugfixVersion();
    }

    private function getLatestServiceReleaseVersion(string $currentReleaseVersion): string
    {
        $releaseInfo = null;
        
        if (Version::isValidVersionNumber($currentReleaseVersion)) {
            $version = new Version($currentReleaseVersion);
            $minorVersion = $version->getMinorVersion();
            
            $releaesInfos = ReleaseInfoRepository::getAvailableReleaseInfos();
            $releaseInfos = array_filter($releaesInfos, function (ReleaseInfo $releaseInfo) use ($minorVersion) {
                if (!$releaseInfo->getVersion()->isLongTermSupportVersion()) {
                    return false;
                }
                return StringUtil::startsWith($releaseInfo->getVersion()->getMinorVersion(), $minorVersion);
            });
            
            $releaseInfo = ArrayUtil::getLastElementOrNull($releaseInfos);
        }
        
        if ($releaseInfo == null) {
            $releaseInfo = ReleaseInfoRepository::getLatestLongTermSupport();
        }
            
        return $releaseInfo == null ? '' : $releaseInfo->getVersion()->getBugfixVersion();
    }
}

