<?php

namespace test\domain;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\ReleaseInfoRepository;
use app\domain\ReleaseType;
use app\domain\ReleaseInfo;
use app\domain\Artifact;
use app\Config;

class ReleaseInfoTest extends TestCase
{
  private ReleaseInfo $testee;

  protected function setUp(): void
  {
    ReleaseInfoRepository::invalidate();
    $_SERVER['HTTPS'] = 'https';
    $_SERVER['HTTP_HOST'] = 'fakehost';

    $this->testee = ReleaseInfoRepository::getLatestLongTermSupport();
  }

  public function test_version()
  {
    Assert::assertEquals('8.0.1', $this->testee->versionNumber());
    Assert::assertEquals('8.0.1', $this->testee->getVersion()->getVersionNumber());
    Assert::assertEquals('8.0', $this->testee->minorVersion());
  }

  public function test_artifacts()
  {
    $artifacts = $this->testee->getArtifacts();
    Assert::assertEquals(8, count($artifacts));
  }

  public function test_artifactEngineDocker()
  {
    $artifact = $this->testee->getArtifactByProductNameAndType(Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_DOCKER);

    Assert::assertEquals(Artifact::PRODUCT_NAME_ENGINE, $artifact->getProductName());
    Assert::assertEquals(Artifact::TYPE_DOCKER, $artifact->getType());
    Assert::assertEquals('8.0.1', $artifact->getVersion()->getVersionNumber());
    Assert::assertEquals('', $artifact->getPermalink());
    Assert::assertEquals('axonivy/axonivy-engine:8.0.1', $artifact->getFileName());
    Assert::assertEquals(Config::DOCKER_HUB_IMAGE_URL, $artifact->getDownloadUrl());
    Assert::assertEquals('/installation?downloadUrl=https://hub.docker.com/r/axonivy/axonivy-engine&version=8.0.1&product=engine&type=docker', $artifact->getInstallationUrl());
    Assert::assertFalse($artifact->isBeta());
    Assert::assertFalse($artifact->isMavenPluginCompatible());
  }

  public function test_artifactWithBomJson()
  {
    $this->testee = ReleaseType::DEV()->releaseInfo();
    $artifact = $this->testee->getArtifactByProductNameAndType(Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_LINUX);
    Assert::assertEquals(Artifact::PRODUCT_NAME_DESIGNER, $artifact->getProductName());
    Assert::assertEquals(Artifact::TYPE_LINUX, $artifact->getType());
    Assert::assertTrue($artifact->hasBom());
    Assert::assertEquals('https://download.axonivy.com/dev/AxonIvyDesigner9.1.0.2002051600_Linux_x64.zip.bom.json', $artifact->getDownloadBomUrl());
  }

  public function test_artifactWithoutBomJson()
  {
    $artifact = $this->testee->getArtifactByProductNameAndType(Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_LINUX);
    Assert::assertEquals(Artifact::PRODUCT_NAME_DESIGNER, $artifact->getProductName());
    Assert::assertEquals(Artifact::TYPE_LINUX, $artifact->getType());
    Assert::assertFalse($artifact->hasBom());
    Assert::assertEquals('', $artifact->getDownloadBomUrl());
  }

  public function test_artifactDesignerWindows()
  {
    $artifact = $this->testee->getArtifactByProductNameAndType(Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_WINDOWS);

    Assert::assertEquals(Artifact::PRODUCT_NAME_DESIGNER, $artifact->getProductName());
    Assert::assertEquals(Artifact::TYPE_WINDOWS, $artifact->getType());
    Assert::assertEquals('8.0.1.96047', $artifact->getVersion()->getVersionNumber());
    Assert::assertEquals('https://fakehost/permalink/8.0.1/axonivy-designer-windows.zip', $artifact->getPermalink());
    Assert::assertEquals('AxonIvyDesigner8.0.1.96047_Windows_x64.zip', $artifact->getFileName());
    Assert::assertEquals('https://download.axonivy.com/8.0.1/AxonIvyDesigner8.0.1.96047_Windows_x64.zip', $artifact->getDownloadUrl());
    Assert::assertEquals('/installation?downloadUrl=https://download.axonivy.com/8.0.1/AxonIvyDesigner8.0.1.96047_Windows_x64.zip&version=8.0.1&product=designer&type=Windows', $artifact->getInstallationUrl());
    Assert::assertFalse($artifact->isBeta());
    Assert::assertFalse($artifact->isMavenPluginCompatible());
  }

  public function test_artifactDockerNotAvailableBefore720()
  {
    $artifact = self::loadDockerArtifact('7.1.0');
    Assert::assertNull($artifact);
  }

  public function test_artifactDockerAvailableSince720()
  {
    $artifact = self::loadDockerArtifact('7.2.0');
    Assert::assertEquals('axonivy/axonivy-engine:7.2.0', $artifact->getFileName());

    $artifact = self::loadDockerArtifact('8.0.0');
    Assert::assertEquals('axonivy/axonivy-engine:8.0.0', $artifact->getFileName());
  }

  public function test_artifactDockerAvailableForAllUnstableReleaseButNot7()
  {
    $artifact = self::loadDockerArtifact('dev');
    Assert::assertEquals('axonivy/axonivy-engine:dev', $artifact->getFileName());

    $artifact = self::loadDockerArtifact('nightly');
    Assert::assertEquals('axonivy/axonivy-engine:nightly', $artifact->getFileName());

    $artifact = self::loadDockerArtifact('nightly-8.0');
    Assert::assertEquals('axonivy/axonivy-engine:nightly-8.0', $artifact->getFileName());

    $artifact = self::loadDockerArtifact('nightly-7');
    Assert::assertNull($artifact);

    $artifact = self::loadDockerArtifact('sprint');
    Assert::assertEquals('axonivy/axonivy-engine:sprint', $artifact->getFileName());
  }

  private static function loadDockerArtifact($version): ?Artifact
  {
    return ReleaseInfoRepository::getBestMatchingVersion($version)->getArtifactByProductNameAndType(Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_DOCKER);;
  }
}
