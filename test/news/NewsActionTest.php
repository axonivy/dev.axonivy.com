<?php
namespace test\community;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class NewsActionTest extends TestCase
{
    
    public function testNewsPage()
    {
        AppTester::assertThatGet('/news')
            ->ok()
            ->bodyContains('What\'s new');
    }

    public function testNewsDetailPage()
    {
        AppTester::assertThatGet('/news/8.0')
        ->ok()
        ->bodyContains('Our new Engine Cockpit has now become a mighty successor of the AdminUI with a rich feature set.');
    }

    public function testNonExistingNews()
    {
        AppTester::assertThatGet('/news/3.9')->notFound();
    }
}
