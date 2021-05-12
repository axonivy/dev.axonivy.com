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
    $redirectUrl = $this->getRedirectUrl($request, $linkKey);
    return Redirect::to($response, $redirectUrl);
  }

  private function getRedirectUrl($request, $linkKey)
  {
    $samplesPrefix = 'https://github.com/ivy-samples/docker-samples/tree/master/';
    $redirects = [
        'docker-elasticsearch-cluster' => $samplesPrefix . 'ivy-elasticsearch-cluster',
        'docker-elasticsearch' => $samplesPrefix . 'ivy-elasticsearch',
        'docker-reverse-proxy-apache' => $samplesPrefix . 'ivy-reverse-proxy-apache',
        'docker-reverse-proxy-nginx' => $samplesPrefix . 'ivy-reverse-proxy-nginx',
        'docker-scaling' => $samplesPrefix . 'ivy-scaling',
        'docker-secrets' => $samplesPrefix . 'ivy-secrets'
    ];

    $newPage = $redirects[$linkKey] ?? '';
    if (empty($newPage)) {
        throw new HttpNotFoundException($request);
    }
    return $newPage;
  }
}
