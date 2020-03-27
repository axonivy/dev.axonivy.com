<?php
namespace app\download;

use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use app\release\model\ReleaseInfo;
use app\release\model\ReleaseInfoRepository;
use app\release\model\Variant;
use app\util\StringUtil;

class DownloadAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(Request $request, $response, $args) {
        $releaseInfo = ReleaseInfoRepository::getLatestLongTermSupport();
        if (StringUtil::endsWith($request->getUri()->getPath(), 'leading-edge')) {
            $releaseInfo = ReleaseInfoRepository::getLeadingEdge();
            
            if ($releaseInfo == null) {
                return $this->container->get('view')->render($response, 'app/download/no-leading-edge.html');
            }
        }

        $loader = new Loader($releaseInfo);
        return $this->container->get('view')->render($response, 'app/download/download.html', [
            'designerArtifacts' => array_filter($loader->designerArtifacts()),
            'engineArtifacts' => array_filter($loader->engineArtifacts()),
            'edition' => $loader->edition(),
            'editionShort' => $loader->editionShort(),
            'minorVersion' => $loader->minorVersion(),
            'showOtherVersions' => $loader->isLTS(),
            'subheader' => $loader->subheader(),
            'showLeadingEdgeBanner' => !$loader->isLTS()
        ]);
    }
}

class Loader
{
    private ReleaseInfo $releaseInfo;

    function __construct(ReleaseInfo $releaseInfo)
    {
        $this->releaseInfo = $releaseInfo;
    }

    function designerArtifacts(): array
    {
        return [
            $this->createDownloadArtifact('Windows','fab fa-windows', Variant::PRODUCT_NAME_DESIGNER, Variant::TYPE_WINDOWS),
            $this->createDownloadArtifact('Linux', 'fab fa-linux', Variant::PRODUCT_NAME_DESIGNER, Variant::TYPE_LINUX),
            $this->createDownloadArtifact('Mac OS', 'fab fa-apple', Variant::PRODUCT_NAME_DESIGNER, Variant::TYPE_MAC),
        ];
    }

    function engineArtifacts(): array
    {
        return [
            $this->createDownloadArtifact('Windows','fab fa-windows', Variant::PRODUCT_NAME_ENGINE, Variant::TYPE_WINDOWS),
            $this->createDockerDownloadArtifact(),
            $this->createDownloadArtifact('Debian','fas fa-cube', Variant::PRODUCT_NAME_ENGINE, Variant::TYPE_DEBIAN),
            $this->createDownloadArtifact('Linux','fab fa-linux', Variant::PRODUCT_NAME_ENGINE, Variant::TYPE_ALL)
        ];
    }
    
    private function createDockerDownloadArtifact(): DownloadArtifact
    {
        $version = $this->releaseInfo->getVersion()->getMinorVersion();
        $url = Variant::createInstallationUrl('', $version, Variant::PRODUCT_NAME_ENGINE, Variant::TYPE_DOCKER);
        return new DownloadArtifact('Docker', $this->description(false), $url, "axonivy/axonivy-engine:$version", 'fab fa-docker');
    }
    
    function createDownloadArtifact($name, $icon, $productName, $type): ?DownloadArtifact
    {
        $variant = $this->releaseInfo->getVariantByProductNameAndType($productName, $type);
        if ($variant == null) {
            return null;
        }
        return new DownloadArtifact($name, $this->description($variant->isBeta()), $variant->getInstallationUrl(), $variant->getFileName(), $icon);
    }
    
    function minorVersion(): string
    {
        return $this->releaseInfo->getVersion()->getMinorVersion();
    }
    
    function description(bool $isBeta): string
    {
        $beta = $isBeta ? ' BETA' : '';
        return $this->releaseInfo->getVersion()->getDisplayVersion() . ' ' . $this->editionShort() . $beta;
    }
    
    function edition(): string
    {
        return $this->isLTS() ? 'Long Term Support' : 'Leading Edge';
    }

    function editionShort(): string
    {
        return $this->isLTS() ? 'LTS' : 'LE';
    }
    
    function subheader(): string
    {
        if ($this->isLTS())
        {
            return '<p>Get stable <a href="/release-cycle" style="text-decoration:underline;font-weight:bold;">Long Term Support</a> versions of the Axon.ivy Digital Business Platform.';
        }
        return '<p>Become an early adopter and take the <a href="/release-cycle" style="text-decoration:underline;font-weight:bold;">Leading Edge</a> road with newest features but frequent migrations.</p>';
    }
    
    function isLTS(): bool
    {
        return $this->releaseInfo->getVersion()->isLongTermSupportVersion();
    }
}

class DownloadArtifact
{
    public string $name;
    public string $description;
    public string $url;
    public string $filename;
    public string $icon;
    public bool $matchesCurrentRequest;
    
    function __construct($name, $description, $url, $filename, $icon)
    {
        $this->name = $name;
        $this->description = $description;
        $this->url = $url;
        $this->filename = $filename;
        $this->icon = $icon;
        $this->matchesCurrentRequest = true;
    }
}
