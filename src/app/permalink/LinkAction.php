<?php

namespace app\permalink;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\domain\util\Redirect;

class LinkAction
{
  public function __invoke($request, Response $response, $args)
  {
    $linkKey = $args['key'];
    $path = $args['path'] ?? '';
    if (!empty($path)) {
      $path = '/' . $path;
    }
    $redirectUrl = $this->getRedirectUrl($request, $linkKey);
    return Redirect::to($response, $redirectUrl . $path);
  }

  private function getRedirectUrl($request, $linkKey)
  {
    $samplesPrefix = 'https://github.com/axonivy/docker-samples/tree/master/';
    $redirects = [
        'docker-samples' => 'https://github.com/axonivy/docker-samples',
        'docker-elasticsearch-cluster' => $samplesPrefix . 'ivy-elasticsearch-cluster',
        'docker-elasticsearch' => $samplesPrefix . 'ivy-elasticsearch',
        'docker-reverse-proxy-apache' => $samplesPrefix . 'ivy-reverse-proxy-apache',
        'docker-reverse-proxy-nginx' => $samplesPrefix . 'ivy-reverse-proxy-nginx',
        'docker-scaling' => $samplesPrefix . 'ivy-scaling',
        'docker-secrets' => $samplesPrefix . 'ivy-secrets',
        
        'demos' => 'https://github.com/axonivy-market/demo-projects',
        
        'build-plugin' => 'https://github.com/axonivy/project-build-plugin',
        
        'webtester' => 'https://github.com/axonivy/web-tester',

        'market-contribute' => 'https://github.com/axonivy/market/blob/master/doc/contribute.md',
    ];

    $newPage = $redirects[$linkKey] ?? '';
    if (empty($newPage)) {
        throw new HttpNotFoundException($request);
    }
    return $newPage;
  }
}