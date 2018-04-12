<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use app\util\StringUtil;
use Slim\Exception\NotFoundException;
use app\release\model\ReleaseInfo;

class StablePermalinksAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        $releaseInfos = ReleaseInfoRepository::getAvailableReleaseInfos();
        
        if (empty($releaseInfos)) {
            throw new NotFoundException($request, $response);
        }
        
        $releaseInfos = array_reverse($releaseInfos);
        $releaseInfo = $releaseInfos[0];
        
        if (isset($args['file'])) {
            $file = $args['file'];
            // if is permalink
            if (preg_match('/AxonIvy(.+)-latest(.+)/', $file)) {
                $url = $this->getRealUrlForPermalink($file, $releaseInfo, $request, $response);
                return $response->withRedirect($url);
            }
        }
        
        throw new NotFoundException($request, $response);
    }
    
    private function getRealUrlForPermalink($file, ReleaseInfo $releaseInfo, $request, $response): ?string {
        $variants = $releaseInfo->getVariants();
        
        $startsAndEndsWith = explode('-latest', $file);
        $startsWith = $startsAndEndsWith[0];
        $endsWith = $startsAndEndsWith[1];
        
        foreach ($variants as $variant) {
            if (StringUtil::startsWith($variant->getFileName(), $startsWith)) {
                if (StringUtil::endsWith($variant->getFileName(), $endsWith)) {
                    return $variant->getDownloadUrl();
                }
            }
        }
        
        throw new NotFoundException($request, $response);
    }
}


