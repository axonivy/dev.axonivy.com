<?php

namespace app\permalink;

use Slim\Exception\HttpNotFoundException;
use app\domain\util\Redirect;
use app\domain\maven\MavenArtifactRepository;
use app\domain\maven\MavenArtifact;
use app\domain\util\StringUtil;

class LibraryPermalinkAction
{
  public function __invoke($request, $response, $args)
  {
    $version = $args['version'];

    if (empty($version)) {
      throw new HttpNotFoundException($request);
    }

    $name = $args['name'] ?? ''; // e.g demo-app.zip

    $type = pathinfo($name, PATHINFO_EXTENSION); // e.g. zip 
    $filename = pathinfo($name, PATHINFO_FILENAME); // e.g. demo-app

    $mavenArtifact = MavenArtifactRepository::getMavenArtifact($filename, $type);
    if ($mavenArtifact == null) {
      throw new HttpNotFoundException($request);
    }

    $url = self::getUrl($mavenArtifact, $version);
    return Redirect::to($response, $url);
  }

  private static function getUrl(MavenArtifact $mavenArtifact, string $version)
  {
    if ($version == 'dev') {
      return $mavenArtifact->getDevUrl();
    } else {
      foreach ($mavenArtifact->getVersions() as $v) {
        if (StringUtil::startsWith($v, $version)) {
          return $mavenArtifact->getUrl($v);
        }
      }
    }
    throw new HttpNotFoundException($request);
  }
}
