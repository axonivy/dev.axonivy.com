<?php

namespace test\ui;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class UiDownloadActionTest extends TestCase
{
    public function testDownload()
    {
        AppTester::assertThatGet('/ui/download')
            ->ok()
            ->bodyContains('ltsCurrent')
            ->bodyContains('ltsMaintenance')
            ->bodyContains('le')
            ->bodyContains('dev');
    }
}
