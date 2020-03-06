<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;
use app\release\model\ReleaseInfoRepository;
use Slim\Http\Response;
use app\util\StringUtil;

class RedirectLatestDocVersion
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, Response $response, $args)
    {
        $version = $args['version'];
        $path = $args['path'];
        if (!empty($path)) {
            $path = '/' . $path;
        }
        
        $releaseInfo = null;
        foreach (ReleaseInfoRepository::getAvailableReleaseInfos() as $info) {
            if (StringUtil::startsWith($info->getVersion()->getVersionNumber(), $version)) {
                $releaseInfo = $info;
            }
        }
        
        if ($releaseInfo == null) {
            throw new NotFoundException($request, $response);
        }
        
        return $response->withRedirect('/doc/' . $releaseInfo->getVersion()->getVersionNumber() . $path, 302);
    }
}
