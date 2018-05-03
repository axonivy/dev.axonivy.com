<?php
namespace app\news;

use Psr\Container\ContainerInterface;

class NewsAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/news/news.html');
    }
}
