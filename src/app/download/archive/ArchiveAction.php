<?php
namespace app\download\archive;

use Psr\Container\ContainerInterface;
use app\release\model\ReleaseInfoRepository;
use app\util\StringUtil;
use Slim\Exception\HttpNotFoundException;

class ArchiveAction
{
    protected $container;
    
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args)
    {
        $links = $this->createLinks();
        
        // determine the current version to show on the ui
        $version = $args['version'] ?? '';
        if (empty($version)) {
            if (empty(IVY_VERSIONS)) {
                throw new HttpNotFoundException($request);
            } else {
                $version = $this->getLatesVersion();
            }
        } else {
            if (!array_key_exists($version, IVY_VERSIONS)) {
                throw new HttpNotFoundException($request);
            }
        }
        
        $releaseInfos = $this->findReleaseInfos($version);

        return $this->container->get('view')->render($response, 'app/download/archive/archive.html', [
            'releaseInfos' => $releaseInfos,
            'versionLinks' => $links,
            'currentMajorVersion' => $version
        ]);
    }
    
    private function createLinks(): array
    {
        $links = [];
        foreach (IVY_VERSIONS as $version => $description) {
            $links[] = new VersionLink($version, $description);
        }
        return $links;
    }
    
    private function getLatesVersion(): string
    {
        foreach (IVY_VERSIONS as $version => $desc) {
            return $version;
        }
        return '';
    }
    
    private function findReleaseInfos(string $version): array
    {
        $availableReleaseInfos = array_reverse(ReleaseInfoRepository::getAvailableReleaseInfos());
        $releaseInfos = [];
        foreach ($availableReleaseInfos as $releaseInfo) {
            $versionNumber = $releaseInfo->getVersion()->getVersionNumber();
            
            if (StringUtil::startsWith($versionNumber, $version)) {
                $releaseInfos[] = $releaseInfo;
            }
            
            if (StringUtil::endsWith($version, 'x')) {
                $versionWithoutX = substr($version, 0, -1);
                if ($releaseInfo->getVersion()->getMinorNumber() != '0') {
                    if (StringUtil::startsWith($versionNumber, $versionWithoutX)) {
                        $releaseInfos[] = $releaseInfo;
                    }
                }
            }
        }
        
        return $releaseInfos;
    }
}

class VersionLink
{
    public $id;
    private $productEdition;
    public function __construct(string $id, string $productEdition)
    {
        $this->id = $id;
        $this->productEdition = $productEdition;
    }
    public function getUrl(): string
    {
        return '/download/archive/' . $this->id;
    }
    public function getDisplayText(): string {
        return $this->id . ' ('.$this->productEdition.')';
    }
}
