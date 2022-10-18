<?php

namespace app\pages\sitemap;

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Slim\Views\Twig;
use app\domain\ReleaseInfo;
use app\domain\ReleaseInfoRepository;

class SitemapAction
{
  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke(Request $request, Response $response, $args)
  {
    $baseUrl = $request->getUri()->getScheme() . '://' . $request->getUri()->getHost();
    $sites = [
      self::createSite($baseUrl, '/', 1),
      self::createSite($baseUrl, '/download', 1),
      self::createSite($baseUrl, '/doc', 1),
      self::createSite($baseUrl, '/tutorial', 1),
      self::createSite($baseUrl, '/support', 1),
      self::createSite($baseUrl, '/team', 1),
    ];

    $releaseInfo = ReleaseInfoRepository::getLatestLongTermSupport();
    if ($releaseInfo != null) {
      $sites = self::addSites($baseUrl, $sites, $releaseInfo);
    }

    return $this->view->render($response, 'sitemap/sitemap.twig', ['sites' => $sites])->withHeader('Content-Type', 'text/xml');
  }

  private static function addSites($baseUrl, $sites, ReleaseInfo $releaseInfo): array
  {
    $minorVersion = $releaseInfo->getVersion()->getMinorVersion();
    foreach (self::getHtmlFiles($releaseInfo->getPath() . '/documents/') as $html) {
      if (!str_starts_with($html, '/')) {
        $html = '/' . $html;
      }
      $sites[] = self::createSite($baseUrl, "/doc/$minorVersion$html", 0.8);
    }
    return $sites;
  }

  private static function getHtmlFiles($directory)
  {
    $files = self::glob_recursive($directory . DIRECTORY_SEPARATOR . '*');
    $files = array_map(function ($path) use ($directory) {
      return substr($path, strlen($directory));
    }, $files);
    return array_filter($files, function ($html) {
      return !str_starts_with($html, 'index') && str_ends_with($html, '.html');
    });
  }

  private static function glob_recursive($pattern, $flags = 0)
  {
    $files = glob($pattern, $flags);
    foreach (glob(dirname($pattern) . '/*', GLOB_ONLYDIR | GLOB_NOSORT) as $dir) {
      $files = array_merge($files, self::glob_recursive($dir . '/' . basename($pattern), $flags));
    }
    return $files;
  }

  private static function createSite($baseUrl, $relativeUrl, $prio): Site
  {
    $site = new Site();
    $site->url =  $baseUrl . $relativeUrl;
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
