<?php
namespace app\release;

use Psr\Container\ContainerInterface;

class NightlyAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        $releaseInfo = ReleaseInfoRepository::getLatestNightly();
        
        $variants = $releaseInfo->getVariants();
        if (count($variants) < 4) {
            $variants = [];
        }
        
        return $this->container->get('view')->render($response, 'app/release/nightly.html', ['variants' => $variants]);
    }
}
