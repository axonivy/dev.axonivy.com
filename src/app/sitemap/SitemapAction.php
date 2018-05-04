<?php
namespace app\sitemap;

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;
use app\release\model\ReleaseInfo;
use app\release\model\ReleaseInfoRepository;
use app\util\StringUtil;

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
            
            self::createSite('/support', 0.8),
            self::createSite('/team', 0.8),
            
            self::createSite('/doc/latest/NewAndNoteworthy.html', 0.6),
            self::createSite('/doc/latest/ReleaseNotes.html', 0.6),
            self::createSite('/doc/latest/MigrationNotes.html', 0.4),
            self::createSite('/doc/latest/ReadMe.html', 0.4),
            self::createSite('/doc/latest/ReadMeEngine.html', 0.4),
        ];
        
        $releaseInfo = ReleaseInfoRepository::getLatest();
        if ($releaseInfo != null) {
            $sites = self::addSites($sites, $releaseInfo, 'DesignerGuideHtml');
            $sites = self::addSites($sites, $releaseInfo, 'EngineGuideHtml');
            $sites = self::addSites($sites, $releaseInfo, 'PortalKitHtml');
            $sites = self::addSites($sites, $releaseInfo, 'PortalConnectorHtml');
            $sites = self::addSites($sites, $releaseInfo, 'PublicAPI');
        }
        
        return $this->container->get('view')->render($response, 'app/sitemap/sitemap.xml', ['sites' => $sites])->withHeader('Content-Type', 'text/xml');
    }
    
    private static function addSites($sites, ReleaseInfo $releaseInfo, $path): array
    {
        $sites[] = self::createSite('/doc/latest/'.$path.'/', 1);
        foreach (self::getHtmlFiles($releaseInfo->getPath() . '/documents/'.$path.'/') as $html) {
            if (!StringUtil::startsWith($html, '/')) {
                $html = '/' . $html;
            }
            $sites[] = self::createSite('/doc/latest/'.$path . $html, 0.8);
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
    
    private static function createSite($url, $prio): Site
    {
        $site = new Site();
        $site->url = $url;
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

