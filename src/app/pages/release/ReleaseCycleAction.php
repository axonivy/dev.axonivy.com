<?php
namespace app\pages\release;

use Psr\Container\ContainerInterface;
use app\domain\ReleaseInfoRepository;

class ReleaseCycleAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        
        $ltsVersions = ReleaseInfoRepository::getLongTermSupportVersions();
        $lts = '';
        foreach ($ltsVersions as $ltsVersion) {
            if (!empty($lts)) {
                $lts .= ' / ';
            }
            $lts .= $ltsVersion->getVersion()->getMinorVersion();
        }
        
        $leadingEdge = ReleaseInfoRepository::getLeadingEdge();
        $le = $leadingEdge == null ? 'not available' : $leadingEdge->getVersion()->getMinorVersion();
        
        return $this->container->get('view')->render($response, 'release/release-cycle.twig', [
            'lts' => $lts,
            'le' => $le
        ]);
    }
}
