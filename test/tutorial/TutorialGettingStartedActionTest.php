<?php
namespace test\tutorial;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class TutorialGettingStartedActionTest extends TestCase
{

    public function testRender()
    {
        AppTester::assertThatGet('/tutorial/getting-started/first-project/step-1')
            ->statusCode(200)
            ->bodyContains('Tutorial - Your First Project')
            ->bodyContains('Start Axon.ivy Designer');
    }
    
    public function testNotFound_ifNonExistingTutorial()
    {
        AppTester::assertThatGetThrowsNotFoundException('/tutorial/getting-started/nonexisting/step-1');
    }
    
    public function testRedirect_ifTutorialNameIsMissing()
    {
        AppTester::assertThatGet('/tutorial/getting-started')
            ->redirect('/tutorial/getting-started/first-project/step-1');
    }
    
    

}