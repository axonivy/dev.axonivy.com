<?php

namespace app\pages\download;

class DownloadRobotsAction
{

  public function __invoke($request, $response, $args)
  {
    $content = "User-agent: *\nDisallow: /\n";
    $response->getBody()->write($content);
    return $response->withHeader('Content-Type', 'text/plain');
  }
}
