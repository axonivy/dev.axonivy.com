<?php
namespace app\installation;

use Psr\Container\ContainerInterface;
use app\release\model\ReleaseInfoRepository;
use app\release\model\Variant;
use Slim\Psr7\Request;

class InstallationAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke(Request $request, $response, $args) {
        $downloadUrl = $request->getQueryParams()['downloadUrl'] ?? '';
        $releaseInfo = ReleaseInfoRepository::getLatest();
        $variant = $releaseInfo == null ? null : $releaseInfo->getMostMatchingVariantForCurrentRequest(Variant::PRODUCT_NAME_DESIGNER);
        return $this->container->get('view')->render($response, 'app/installation/installation.html', [
            'downloadUrl' => $downloadUrl,
            'variant' => $variant
        ]);
    }
}
