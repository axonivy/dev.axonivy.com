<?php

namespace test\ui;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class UiArchiveActionTest extends TestCase
{
    public function testArchive(): void
    {
        AppTester::assertThatGet('/ui/archive/8.0')
            ->ok()
            ->bodyContains('releaseInfos')
            ->bodyContains('"version":"8.0.1"')
            ->bodyContains('"designerArtifacts"')
            ->bodyContains('AxonIvyDesigner8.0.1.96047_Linux_x64.zip')
            ->bodyContains('"engineArtifacts"')
            ->bodyContains('AxonIvyEngine8.0.1.96047_All_x64.zip');
    }
}
