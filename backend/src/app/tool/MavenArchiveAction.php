<?php

namespace app\tool;

use app\Config;
use app\domain\ReleaseInfoRepository;
use app\domain\Version;
use app\domain\ReleaseType;

class MavenArchiveAction
{
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
          $artifacts[] = new MavenArchiveArtifact(
            $artifact->getDownloadUrl(),
            $artifact->getFilename()
          );
        }
      }

      if (!empty($artifacts)) {
        $releases[] = new MavenArchiveRelease(
          $releaseInfo->getVersion()->getVersionNumber(),
          $artifacts
        );
      }
    }

    $releases = array_reverse($releases);

    $html = '<h1>Axon Ivy Maven Engine Archive</h1>';
    $html .= '<p>The engine archive that can be used with the Maven plugin '
      . '<code>com.axonivy.ivy.ci:project-compile-plugin</code>.</p>';

    foreach ($releases as $release) {
      $html .= '<h2>Release ' . htmlspecialchars($release->version, ENT_QUOTES, 'UTF-8') . '</h2>';
      $html .= '<ul>';

      foreach ($release->artifacts as $artifact) {
        $url = htmlspecialchars($artifact->url, ENT_QUOTES, 'UTF-8');
        $filename = htmlspecialchars($artifact->filename, ENT_QUOTES, 'UTF-8');

        $html .= '<li><a href="' . $url . '">' . $filename . '</a></li>';
      }

      $html .= '</ul>';
    }

    $response->getBody()->write($html);

    return $response->withHeader('Content-Type', 'text/html; charset=UTF-8');
  }

  private static function versionSupported(Version $version): bool
  {
    if (str_starts_with($version->getVersionNumber(), ReleaseType::NIGHTLY()->key())) {
      return true;
    }

    return $version->isEqualOrGreaterThan(
      Config::MAVEN_SUPPORTED_RELEASES_SINCE_VERSION
    );
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
