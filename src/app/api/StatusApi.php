<?php
namespace app\api;

use app\release\model\ReleaseInfo;
use app\release\model\ReleaseInfoRepository;

class StatusApi
{
    public function __invoke($request, $response, $args) {
        $data = $this->status();
        $response->getBody()->write((string) json_encode($data));
        $response = $response->withHeader('Content-Type', 'application/json');
        return $response;
    }
    
    private function status()
    {
        return [
            'site' => [
                'phpVersion' => phpversion()
            ],
            'data' => [
                'latestReleaseVersion' => $this->getVersionNumber(ReleaseInfoRepository::getLatest()),
                'latestLtsReleaseVersion' => $this->getVersionNumber(ReleaseInfoRepository::getLatestLongTermSupport()),
                'versions' => $this->getVersions()
            ]            
        ];
    }
    
    private function getVersionNumber(?ReleaseInfo $releaseInfo)
    {
        return $releaseInfo == null ? '' : $releaseInfo->getVersion()->getVersionNumber();
    }
    
    private function getVersions(): array
    {
        $versions = [];
        foreach (ReleaseInfoRepository::getAvailableReleaseInfos() as $releaseInfo)
        {
            $versions[] = $releaseInfo->getVersion()->getVersionNumber();
        }
        return $versions;
    }
}
