<?php
namespace test\release\model;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\release\model\SprintArtifact;

class SprintArtifactTest extends TestCase
{
    public function testFilename()
    {
        $artifact = new SprintArtifact('filename', 'downloadurl');
        Assert::assertEquals('filename', $artifact->getFileName());
    }
    
    public function testDownloadUrl()
    {
        $artifact = new SprintArtifact('filename', 'downloadurl');
        Assert::assertEquals('downloadurl', $artifact->getDownloadUrl());
    }
    
    public function testPermalink()
    {
        $artifact = new SprintArtifact('AxonIvyEngine7.0.1.56047.S8_All_x64.zip', 'downloadurl');
        Assert::assertEquals('https://developer.axonivy.com/download/sprint-release/AxonIvyEngine-latest_All_x64.zip', $artifact->getPermalink());
    }
    
    public function testPermalink_Slim_All()
    {
        $artifact = new SprintArtifact('AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip', 'downloadurl');
        Assert::assertEquals('https://developer.axonivy.com/download/sprint-release/AxonIvyEngine-latest_Slim_All_x64.zip', $artifact->getPermalink());
    }
}