<?php
namespace app\pages\community;

use Psr\Container\ContainerInterface;

class CommunityAction
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args)
    {
        return $this->container->get('view')->render($response, 'community/community.twig');
    }
}
