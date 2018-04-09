<?php
namespace app\team;

use Psr\Container\ContainerInterface;

class TeamAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/team/team.html', [
            'employees' => TeamRepository::getMembers()
        ]);
    }
}
