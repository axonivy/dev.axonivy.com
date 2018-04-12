<?php
namespace app\release;

use Psr\Container\ContainerInterface;
use app\util\StringUtil;
use Slim\Exception\NotFoundException;
use app\release\model\ReleaseInfo;

class SprintReleaseAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        $releaseInfo = ReleaseInfoRepository::getSprintRelease();
        
        if (isset($args['file'])) {
            $file = $args['file'];
            // if is permalink
            if (preg_match('/AxonIvy(.+)-latest(.+)/', $file)) {
                $file = $this->getRealUrlForPermalink($file, $releaseInfo, $request, $response);
            }
            return $response->withRedirect('/'.IVY_SPRINT_RELEASE_DIR_RELATIVE.'/' . $file);
        }
        
        $baseUrl = BASE_URL . '/download/sprint-release';
        return $this->container->get('view')->render($response, 'app/release/sprint-release.html', [
            'releaseInfo' => $releaseInfo,
            'sprintUrl' => $baseUrl,
            'sprintUrlP2' => $baseUrl . '/p2'
        ]);
    }
    
    private function getRealUrlForPermalink($file, ReleaseInfo $releaseInfo, $request, $response): string {
        $artifacts = $releaseInfo->getSprintArtifacts();
        
        $startsAndEndsWith = explode('-latest', $file);
        $startsWith = $startsAndEndsWith[0];
        $endsWith = $startsAndEndsWith[1];
        
        foreach ($artifacts as $artifact) {
            if (StringUtil::startsWith($artifact->getFileName(), $startsWith)) {
                if (StringUtil::endsWith($artifact->getFileName(), $endsWith)) {
                    return $artifact->getFileName();
                }
            }
        }
        
        throw new NotFoundException($request, $response);
    }
}


