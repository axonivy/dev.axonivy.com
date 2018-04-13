<?php
namespace test\release\model;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\release\model\SprintArtifact;

class SprintArtifactTest extends TestCase
{
    public function testFilename()
    {
        $artifact = new SprintArtifact('filename', 'downloadurl', 'permalink');
        Assert::assertEquals('filename', $artifact->getFileName());
    }
    
    public function testDownloadUrl()
    {
        $artifact = new SprintArtifact('filename', 'downloadurl', 'permalink');
        Assert::assertEquals('downloadurl', $artifact->getDownloadUrl());
    }
    
    public function testPermalink()
    {
        $artifact = new SprintArtifact('filename', 'downloadurl', 'AxonIvyEngine7.0.1.56047.S8_All_x64.zip');
        Assert::assertEquals('AxonIvyEngine7.0.1.56047.S8_All_x64.zip', $artifact->getPermalink());
    }
    
}