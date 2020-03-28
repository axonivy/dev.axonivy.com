<?php
namespace app\pages\sitemap;

use Psr\Container\ContainerInterface;
use app\domain\ReleaseInfo;
use app\domain\ReleaseInfoRepository;
use app\domain\util\StringUtil;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class SitemapAction
{
    protected $container;
    
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }
    
    public function __invoke(Request $request, Response $response, $args) {
        $sites = [
            self::createSite('/', 1),
            self::createSite('/download', 1),
            self::createSite('/doc', 1),
            self::createSite('/tutorial', 1),
            self::createSite('/market', 1),
            self::createSite('/support', 1),
            self::createSite('/team', 1),
        ];

        $releaseInfo = ReleaseInfoRepository::getLatestLongTermSupport();       
        if ($releaseInfo != null) {
            $sites = self::addSites($sites, $releaseInfo);
        }

        return $this->container->get('view')->render($response, 'sitemap/sitemap.twig', ['sites' => $sites])->withHeader('Content-Type', 'text/xml');
    }

    private static function addSites($sites, ReleaseInfo $releaseInfo): array
    {
        $minorVersion = $releaseInfo->getVersion()->getMinorVersion();
        foreach (self::getHtmlFiles($releaseInfo->getPath() . '/documents/') as $html) {
            if (!StringUtil::startsWith($html, '/')) {
                $html = '/' . $html;
            }
            $sites[] = self::createSite("/doc/$minorVersion$html", 0.8);
        }
        return $sites;
    }
    
    private static function getHtmlFiles($directory) {
        $files = self::glob_recursive($directory . DIRECTORY_SEPARATOR . '*');
        $files = array_map(function($path) use ($directory) {
            return substr($path, strlen($directory));
        }, $files);
        return array_filter($files, function($html) {
           return !StringUtil::startsWith($html, 'index') && StringUtil::endsWith($html, '.html'); 
        });
    }
    
    private static function glob_recursive($pattern, $flags = 0)
    {
        $files = glob($pattern, $flags);
        foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir) {
            $files = array_merge($files, self::glob_recursive($dir.'/'.basename($pattern), $flags));
        }
        return $files;
    }
    
    private static function createSite($relativeUrl, $prio): Site
    {
        $site = new Site();
        $site->url =  BASE_URL . $relativeUrl;
        $site->changeFreq = 'daily';
        $site->prio = $prio;
        return $site;
    }
    
}

class Site
{
    public $url;
    public $changeFreq;
    public $prio;
}

