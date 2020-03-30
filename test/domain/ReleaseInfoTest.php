<?php
namespace test\domain;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\ReleaseInfoRepository;
use app\domain\ReleaseInfo;
use app\domain\Artifact;
use app\Config;

class ReleaseInfoTest extends TestCase
{
    private ReleaseInfo $testee;

    protected function setUp(): void
    {
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
    
    public function test_artifactEngineDebian()
    {
        $artifact = $this->testee->getArtifactByProductNameAndType(Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_DEBIAN);
        
        Assert::assertEquals(Artifact::PRODUCT_NAME_ENGINE, $artifact->getProductName());
        Assert::assertEquals(Artifact::TYPE_DEBIAN, $artifact->getType());
        Assert::assertEquals('8.0.1.96047', $artifact->getVersion()->getVersionNumber());
        Assert::assertEquals('https://fakehost/permalink/8.0.1/axonivy-engine.deb', $artifact->getPermalink());
        Assert::assertEquals('axonivy-engine-8x_8.0.1.96047.deb', $artifact->getFileName());
        Assert::assertEquals('https://download.axonivy.com/8.0.1/axonivy-engine-8x_8.0.1.96047.deb', $artifact->getDownloadUrl());
        Assert::assertEquals('/installation?downloadUrl=https://download.axonivy.com/8.0.1/axonivy-engine-8x_8.0.1.96047.deb&version=8.0.1.96047&product=engine&type=Debian', $artifact->getInstallationUrl());
        Assert::assertFalse($artifact->isBeta());
        Assert::assertFalse($artifact->isMavenPluginCompatible());
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
        Assert::assertEquals('/installation?downloadUrl=https://download.axonivy.com/8.0.1/AxonIvyDesigner8.0.1.96047_Windows_x64.zip&version=8.0.1.96047&product=designer&type=Windows', $artifact->getInstallationUrl());
        Assert::assertFalse($artifact->isBeta());
        Assert::assertFalse($artifact->isMavenPluginCompatible());
    }
}
