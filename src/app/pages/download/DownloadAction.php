<?php
namespace app\pages\download;

use Slim\Psr7\Request;
use Slim\Views\Twig;
use app\domain\ReleaseInfo;
use app\domain\Variant;
use Slim\Exception\HttpNotFoundException;
use app\domain\ReleaseType;

class DownloadAction
{

    private Twig $view;

    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke(Request $request, $response, $args) {
        $version = $args['version'] ?? '';
        
        $releaseType = $this->releaseType($version);
        if ($releaseType == null)
        {
          throw new HttpNotFoundException($request);
        }

        $loader = $this->createLoader($releaseType);

        return $this->view->render($response, 'download/download.twig', [
            'designerArtifacts' => $loader->designerArtifacts(),
            'engineArtifacts' => $loader->engineArtifacts(),

            'headerTitle' => $loader->headerTitle(),
            'headerSubTitle' => $releaseType->headline(),
            'banner' => $releaseType->banner(),
            
            'showOtherVersions' => ReleaseType::isLTS($releaseType),
            
            'archiveLink' => $loader->archiveLink(),
            'versionShort' => $loader->versionShort(),
        ]);
    }

    private function releaseType(string $version): ?ReleaseType
    {
        if (empty($version)) {
            return ReleaseType::LTS();
        }
        return ReleaseType::byKey($version);
    }

    private function createLoader(ReleaseType $releaseType)
    {
        $releaseInfo = $releaseType->releaseInfo();
        if ($releaseInfo == null) {
            return new ReleaseTypeNotAvailableLoader($releaseType);
        }
        return new ReleaseInfoLoader($releaseType, $releaseInfo);
    }
}

interface Loader
{
    function designerArtifacts(): array;
    function engineArtifacts(): array;

    function headerTitle(): string;
    
    function versionShort(): string;
    function archiveLink(): string;
}

class ReleaseTypeNotAvailableLoader implements Loader
{
    private ReleaseType $releaseType;
    
    function __construct(ReleaseType $releaseType)
    {
        $this->releaseType = $releaseType;
    }
    
    public function designerArtifacts(): array
    {
        return [];
    }

    public function engineArtifacts(): array
    {
        return [];
    }

    public function headerTitle(): string
    {
        return $this->releaseType->name() . " currently not available";
    }
    
    public function versionShort(): string
    {
        return $this->releaseType->shortName();
    }
    
    public function archiveLink(): string
    {
        return '/download/archive';    
    }
}

class ReleaseInfoLoader implements Loader
{
    private ReleaseType $releaseType;
    private ReleaseInfo $releaseInfo;

    function __construct(ReleaseType $releaseType, ReleaseInfo $releaseInfo)
    {
        $this->releaseType = $releaseType;
        $this->releaseInfo = $releaseInfo;
    }

    function designerArtifacts(): array
    {
        $artifacts = [
            $this->createDownloadArtifact('Windows','fab fa-windows', Variant::PRODUCT_NAME_DESIGNER, Variant::TYPE_WINDOWS),
            $this->createDownloadArtifact('Linux', 'fab fa-linux', Variant::PRODUCT_NAME_DESIGNER, Variant::TYPE_LINUX),
            $this->createDownloadArtifact('Mac OS', 'fab fa-apple', Variant::PRODUCT_NAME_DESIGNER, Variant::TYPE_MAC),
        ];
        return array_filter($artifacts);
    }

    function engineArtifacts(): array
    {
        $artifacts = [
            $this->createDownloadArtifact('Windows','fab fa-windows', Variant::PRODUCT_NAME_ENGINE, Variant::TYPE_WINDOWS),
            $this->createDownloadArtifact('Docker', 'fab fa-docker', Variant::PRODUCT_NAME_ENGINE, Variant::TYPE_DOCKER),
            $this->createDownloadArtifact('Debian','fas fa-cube', Variant::PRODUCT_NAME_ENGINE, Variant::TYPE_DEBIAN),
            $this->createDownloadArtifact('Linux','fab fa-linux', Variant::PRODUCT_NAME_ENGINE, Variant::TYPE_ALL)
        ];
        return array_filter($artifacts);
    }

    private function createDownloadArtifact($name, $icon, $productName, $type): ?DownloadArtifact
    {
        $variant = $this->releaseInfo->getVariantByProductNameAndType($productName, $type);
        if ($variant == null) {
            return null;
        }
        
        $description = '';
        $beta = $variant->isBeta() ? ' BETA' : '';
        if ($this->releaseType->isDevRelease()) {
            $description = $variant->getVersion()->getVersionNumber() . ' ' . $beta;
        } else {
            $description = $variant->getVersion()->getBugfixVersion() . ' ' . $this->releaseType->shortName() . $beta;
        }
        
        $permalink = $variant->getPermalink();
        return new DownloadArtifact(
            $name,
            $description,
            $variant->getInstallationUrl(),
            $variant->getFileName(),
            $icon,
            $permalink);
    }
    
    public function headerTitle(): string
    {
        return "Download " . $this->releaseType->name() . $this->minorVersion();
    }
    
    public function versionShort(): string
    {
        return $this->releaseType->shortName() . $this->minorVersion();
    }
    
    private function minorVersion(): string
    {
        return $this->releaseType->isDevRelease() ? '' : ' ' . $this->releaseInfo->minorVersion();
    }

    public function archiveLink(): string
    {
        return $this->releaseType->archiveLink($this->releaseInfo);
    }
}

class DownloadArtifact
{
    public string $name;
    public string $description;
    public string $url;
    public string $filename;
    public string $icon;
    public string $permalink;
    
    function __construct($name, $description, $url, $filename, $icon, $permalink)
    {
        $this->name = $name;
        $this->description = $description;
        $this->url = $url;
        $this->filename = $filename;
        $this->icon = $icon;
        $this->permalink = $permalink;
    }
}
