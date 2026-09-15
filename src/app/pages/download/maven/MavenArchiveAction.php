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

    usort($releases, function (MavenArchiveRelease $left, MavenArchiveRelease $right): int {
      $group = function (string $version): int {
        if (str_starts_with($version, 'nightly')) {
          return 0;
        }
        if (str_starts_with($version, 'milestone')) {
          return 1;
        }
        if (str_starts_with($version, 'dev')) {
          return 2;
        }
        return 3;
      };

      $groupComparison = $group($left->version) <=> $group($right->version);

      if ($groupComparison !== 0) {
        return $groupComparison;
      }
      return version_compare($right->version, $left->version);
    });

    return $this->view->render($response, 'download/maven/maven.twig', ['releases' => $releases]);
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
