<?php
namespace app\devday;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;

class DevDayAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        if (!isset($args['year']))
        {
            $devDay = DevDayRepository::getLatestDevDay();
            if ($devDay == null) {
                throw new NotFoundException($request, $response);
            }
            return $response->withStatus(302)->withHeader('Location', '/devday/' . $devDay->year);
        }
        
        $devDay = DevDayRepository::getDevDay($args['year']);
        if ($devDay == null) {
            throw new NotFoundException($request, $response);
        }
        return $this->container->get('view')->render($response, 'app/devday/devday.html', ['devday' => $devDay]);
    }
}
