<?php
namespace app\news;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;

class NewsAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        $version = $args['version'] ?? "";

        if (empty($version)) {
            return $this->container->get('view')->render($response, 'app/news/news.html');
        }

        $dirs = glob(__DIR__  . '/*' , GLOB_ONLYDIR);
        foreach ($dirs as $dir) {            
            if (basename($dir) == $version) {
                return $this->container->get('view')->render($response, 'app/news/news-page.html', ['version' => $version]);        
            }
        }

        throw new NotFoundException($request, $response);        
    }
}
