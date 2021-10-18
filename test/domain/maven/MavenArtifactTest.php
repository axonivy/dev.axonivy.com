<?php

namespace test\domain\maven;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\market\Market;
use app\domain\maven\MavenArtifact;
use app\domain\maven\MavenArtifactRepository;

class MavenArtifactTest extends TestCase
{

  public function testGetMavenArtifact()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('workflow-demos', 'iar');
    $this->assertEquals('Workflow Demos', $artifact->getName());
  }

  public function testGetMavenArtifact_notExisting()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('does not exist', '');
    $this->assertNull($artifact);
  }

  public function testGetWorkflowDemo()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('workflow-demos', 'iar');
    $this->assertEquals('Workflow Demos', $artifact->getName());
  }

  public function testMavenArtifact()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('connectivity-demos', 'iar');
    $this->assertEquals('Connectivity Demos', $artifact->getName());
    $this->assertEquals('ch.ivyteam.demo', $artifact->getGroupId());
    $this->assertEquals('connectivity-demos', $artifact->getArtifactId());
    $this->assertEquals('/permalink/lib/dev/connectivity-demos.iar', $artifact->getPermalinkDev());
  }

  public function testParseLatestVersionFromXml()
  {
    $xml = file_get_contents(dirname(__FILE__) . '/maven-metadata.xml');
    $versions = MavenArtifact::parseVersions($xml);
    $this->assertEquals('7.2.0-SNAPSHOT', $versions[0]);
    $this->assertEquals('7.3.0-SNAPSHOT', $versions[1]);
  }

  public function testParseVersionIdentifierFromXml()
  {
    $xml = file_get_contents(dirname(__FILE__) . '/maven-metadata-specific.xml');
    $version = MavenArtifact::parseVersionIdentifierFromXml($xml);
    $this->assertEquals('7.3.0-20181115.013605-5', $version);
  }

  public function test_key()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('visualvm-plugin', 'nbm'); // artifactId in meta.json
    Assert::assertEquals('visualvm-plugin', $artifact->getKey());

    $artifact = MavenArtifactRepository::getMavenArtifact('demos', 'zip'); // key explicitly provided in meta.json
    Assert::assertEquals('demos', $artifact->getKey());
  }

  public function test_type()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('visualvm-plugin', 'nbm');
    Assert::assertEquals('nbm', $artifact->getType());

    $artifact = MavenArtifactRepository::getMavenArtifact('demos', 'zip');
    Assert::assertEquals('zip', $artifact->getType());

    $artifact = MavenArtifactRepository::getMavenArtifact('workflow-demos', 'iar');
    Assert::assertEquals('iar', $artifact->getType());
  }

  public function test_makeSenseAsMavenDependency()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('visualvm-plugin', 'nbm');
    Assert::assertFalse($artifact->getMakesSenseAsMavenDependency());

    $artifact = MavenArtifactRepository::getMavenArtifact('doc-factory', 'iar');
    Assert::assertTrue($artifact->getMakesSenseAsMavenDependency());
  }
  
  public function test_repoUrl()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('a-trust-connector', 'iar');
    Assert::assertEquals('https://maven.axonivy.com/', $artifact->getRepoUrl());
    
    $artifact = MavenArtifactRepository::getMavenArtifact('visualvm-plugin', 'nbm');
    Assert::assertEquals('https://maven.axonivy.com/', $artifact->getRepoUrl());
  }

  public function test_isDocumentation()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('visualvm-plugin', 'nbm');
    Assert::assertFalse($artifact->isDocumentation());

    $artifact = MavenArtifactRepository::getMavenArtifact('doc-factory-doc', 'zip');
    Assert::assertTrue($artifact->isDocumentation());
  }

  public function test_name()
  {
    $artifact = MavenArtifactRepository::getMavenArtifact('visualvm-plugin', 'nbm');
    Assert::assertEquals('Visual VM Plugin', $artifact->getName());

    $artifact = MavenArtifactRepository::getMavenArtifact('doc-factory-doc', 'zip');
    Assert::assertEquals('Doc Factory Documentation', $artifact->getName());
  }
}
