<?php

namespace app\pages\download\maven;

use Slim\Views\Twig;
use app\Config;
use app\domain\ReleaseInfoRepository;
use app\domain\Version;
use app\domain\ReleaseType;

class MavenArchiveAction
{
  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    $releases = [];
    foreach (ReleaseInfoRepository::getAvailableReleaseInfos() as $releaseInfo) {
      if (!self::versionSupported($releaseInfo->getVersion())) {
        continue;
      }

      $artifacts = [];
      foreach ($releaseInfo->getArtifacts() as $artifact) {
        if ($artifact->isMavenPluginCompatible()) {
          $artifacts[] = new MavenArchiveArtifact($artifact->getDownloadUrl(), $artifact->getFilename());
        }
      }
      if (!empty($artifacts)) {
        $releases[] = new MavenArchiveRelease($releaseInfo->getVersion()->getVersionNumber(), $artifacts);
      }
    }
    $releases = array_reverse($releases);
    return $this->view->render($response, 'download/maven/maven.twig', ['releases' => $releases]);
  }

  private static function versionSupported(Version $version): bool
  {
    if (str_starts_with($version->getVersionNumber(), ReleaseType::NIGHTLY()->key())) {
      return true;
    }
    return $version->isEqualOrGreaterThan(Config::MAVEN_SUPPORTED_RELEASES_SINCE_VERSION);
  }
}

class MavenArchiveRelease
{
  public string $version;
  public array $artifacts;

  public function __construct(string $version, array $artifacts)
  {
    $this->version = $version;
    $this->artifacts = $artifacts;
  }
}

class MavenArchiveArtifact
{
  public string $url;
  public string $filename;

  public function __construct(string $url, string $filename)
  {
    $this->url = $url;
    $this->filename = $filename;
  }
}
