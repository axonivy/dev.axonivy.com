<?php

namespace test\pages\news;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class NewsActionTest extends TestCase
{

  public function testNewsPage()
  {
    AppTester::assertThatGet('/news')
      ->ok()
      ->bodyContains('What\'s new')
      ->bodyContains('Smart, smarter, Axon Ivy Platform')
      ->bodyContains('Successfully deploying your application in your customers')
      ->bodyContains('December 4th, 2019');
  }

  public function testNewsDetailPage()
  {
    AppTester::assertThatGet('/news/8.0')
      ->ok()
      ->bodyContains('Our new Engine Cockpit has now become a mighty successor of the AdminUI with a rich feature set.')
      ->bodyContains('Smart, smarter, Axon Ivy Platform')
      ->bodyContains('Axon Ivy now runs with Java 11. Which is the most recent LTS runtime for Java.')
      ->bodyContains('/images/news/8.0/native-mac-gtk3/01-high-sierra-rest-activity.png')
      ->bodyContains('December 4th, 2019');
  }

  public function testNonExistingNews()
  {
    AppTester::assertThatGet('/news/3.9')->notFound();
  }
}
