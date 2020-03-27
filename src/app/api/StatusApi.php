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
                'latestVersion' => $this->getVersionNumber(ReleaseInfoRepository::getLatest()),
                'latestLtsVersion' => $this->getVersionNumber(ReleaseInfoRepository::getLatestLongTermSupport()),
                'leadingEdgeVersion' => $this->getVersionNumber(ReleaseInfoRepository::getLeadingEdge()),
                'longTermSupportVersions' => $this->getVersionNumbers(ReleaseInfoRepository::getLongTermSupportVersions()),
                'versions' => $this->getVersions()
            ]
        ];
    }

    private function getVersionNumbers(array $releaseInfos)
    {
        $versions = [];
        foreach ($releaseInfos as $releaseInfo) {
            $versions[] = $this->getVersionNumber($releaseInfo);
        }
        return $versions;
    }
    
    private function getVersionNumber(?ReleaseInfo $releaseInfo)
    {
        return $releaseInfo == null ? 'not available' : $releaseInfo->getVersion()->getVersionNumber();
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
