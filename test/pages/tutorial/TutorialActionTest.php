<?php

namespace test\pages\tutorial;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class TutorialActionTest extends TestCase
{

  public function testRender()
  {
    AppTester::assertThatGet('/tutorial')
      ->statusCode(200)
      ->bodyContains('Learn how to work with the Axon.ivy Digital Business Platform');
  }

  public function testRender_tutorialSignalExists()
  {
    AppTester::assertThatGet('/tutorial')
      ->statusCode(200)
      ->bodyContains('Adaptive Processes with Signals')
      ->bodyContains('In this tutorial series Axon.ivy product owner Reto Weiss')
      ->bodyContains('https://www.youtube.com/watch?list=PLrFKpclzHMnJ75d7eT8HKn3B1oz0_quT9&amp;v=3k7v3kbyDec')
      ->bodyContains('https://www.youtube.com/embed/videoseries?list=PLrFKpclzHMnJ75d7eT8HKn3B1oz0_quT9');
  }
}
