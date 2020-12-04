<?php

namespace test\permalink;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use app\domain\maven\MavenArtifactRepository;
use app\domain\maven\MavenArtifact;

class LibraryPermalinkActionTest extends TestCase
{
  public function testPermalink_dev()
  {
    $artifact = self::demosApp();

    $version = $artifact->getVersions()[0];
    $concretVersion = $artifact->getConcreteVersion($version);

    AppTester::assertThatGet('/permalink/lib/dev/demos.zip')
      ->redirect("https://repo.axonivy.rocks/ch/ivyteam/demo/ivy-demos-app/$version/ivy-demos-app-$concretVersion.zip");
  }

  public function testPermalink_specificVersion()
  {
    $artifact = self::demosApp();

    $version = '9.1.0-SNAPSHOT';
    $concretVersion = $artifact->getConcreteVersion($version);

    AppTester::assertThatGet('/permalink/lib/9.1.0-SNAPSHOT/demos.zip')
      ->redirect("https://repo.axonivy.rocks/ch/ivyteam/demo/ivy-demos-app/$version/ivy-demos-app-$concretVersion.zip");
  }

  public function testPermalink_minorVersion()
  {
    $artifact = self::demosApp();

    $version = '8.0.5-SNAPSHOT';
    $concretVersion = $artifact->getConcreteVersion($version);

    AppTester::assertThatGet('/permalink/lib/8.0/demos.zip')
      ->redirect("https://repo.axonivy.rocks/ch/ivyteam/demo/ivy-demos-app/$version/ivy-demos-app-$concretVersion.zip");
  }

  private static function demosApp(): MavenArtifact
  {
    return MavenArtifactRepository::getMavenArtifact('demos', 'zip');
  }
}
