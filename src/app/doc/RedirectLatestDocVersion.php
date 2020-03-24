<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use app\release\model\ReleaseInfoRepository;
use app\util\StringUtil;
use Slim\Psr7\Response;
use DI\NotFoundException;
use app\util\Redirect;

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
        if (! empty($path)) {
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

        return Redirect::to($response, '/doc/' . $releaseInfo->getVersion()->getVersionNumber() . $path);
    }
}
