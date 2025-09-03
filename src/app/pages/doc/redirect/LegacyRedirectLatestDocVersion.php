<?php

namespace app\pages\doc\redirect;

use Slim\Psr7\Response;
use app\domain\util\Redirect;
use app\domain\ReleaseInfoRepository;
use Slim\Exception\HttpNotFoundException;

/**
 * Redirects
 *  /doc/latest to /doc/8.0/en        -> latest LTS english
 *  /doc/latest/en to /doc/8.0/en     -> latest LTS english
 *  /doc/8.0.latest to /doc/8.0/en    -> latest update release english
 *  /doc/8.0.latest/en to /doc/8.0/en -> latest update release english
 *
 * This is only for legacy links. Do not publish such links.
 */
class LegacyRedirectLatestDocVersion
{
  public function __invoke($request, Response $response, $args)
  {
    $version = $args['version'] ?? '';
    $path = $args['path'] ?? '';
    $hasLang = $this->evaluateHasLanguage($path);
    if (!empty($path)) {
      $path = '/' . $path;
    }

    if ($version == 'latest') {
      $lts = ReleaseInfoRepository::getLatestLongTermSupport();
      if ($lts == null) {
        throw new HttpNotFoundException($request);
      }
      $baseUrl = $hasLang ? $lts->getDocProvider()->getMinorUrl() : $lts->getDocProvider()->getDefaultLanguageMinorUrl();
      return Redirect::to($response, $baseUrl . $path);
    }

    $version = substr($version, 0, 3);
    return Redirect::to($response, "/doc/$version" . $path);
  }

  private function evaluateHasLanguage(string $docName) : bool
  {
    if (empty($docName)) 
    {
      return false;
    }
    $path = explode('/', $docName);
    $lang = $path[0];
    return strlen($lang) == 2;
  }

}
