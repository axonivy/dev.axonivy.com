<?php
namespace app\news;

use Psr\Container\ContainerInterface;
use Slim\Exception\HttpNotFoundException;

class NewsAction
{

    protected $view;

    public function __construct(ContainerInterface $container)
    {
        $this->view = $container->get('view');
    }

    public function __invoke($request, $response, $args)
    {
        $version = $args['version'] ?? "";

        if (empty($version)) {
            return $this->view->render($response, 'app/news/news.html');
        }

        $dirs = glob(__DIR__ . '/*', GLOB_ONLYDIR);
        foreach ($dirs as $dir) {
            if (basename($dir) == $version) {
                return $this->view->render($response, 'app/news/news-page.html', [
                    'version' => $version
                ]);        
            }
        }

        throw new HttpNotFoundException($request);        
    }
}
