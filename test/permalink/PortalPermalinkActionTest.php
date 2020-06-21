<?php
namespace test\permalink;

use PHPUnit\Framework\TestCase;
use app\domain\market\Market;
use app\domain\util\StringUtil;
use test\AppTester;
use PHPUnit\Framework\Assert;

class PortalPermalinkActionTest extends TestCase
{

    public function testPortal()
    {
        AppTester::assertThatGet('/portal')->redirect('/market/portal');
    }

    public function testPortalMinorVersion()
    {
        $latestVersion = $this->getLatestVersion('8.0');
        Assert::assertNotEquals('8.0', $latestVersion); // should be a bugfix version like 8.0.3
        AppTester::assertThatGet('/portal/8.0')->redirect("/market/portal/$latestVersion");
    }

    public function testPortalBugfixVersion()
    {
        AppTester::assertThatGet('/portal/8.0.3')->redirect("/market/portal/8.0.3");
    }
    
    public function testPortalDevReleases()
    {
        $latestAvailableRelease = $this->latestAvailableRelease();
        AppTester::assertThatGet('/portal/dev')->redirect("/market/portal/$latestAvailableRelease");
        AppTester::assertThatGet('/portal/sprint')->redirect("/market/portal/$latestAvailableRelease");
        AppTester::assertThatGet('/portal/nightly')->redirect("/market/portal/$latestAvailableRelease");
    }
    
    public function testPortalLatest()
    {
        AppTester::assertThatGet('/portal/latest')->redirect('/market/portal/' . Market::getProductByKey('portal')->getLatestVersionToDisplay());
    }

    public function testPortalDoc()
    {
        AppTester::assertThatGet('/portal/8.0.3/doc')->redirect('/documentation/portal-guide/8.0.3');
        AppTester::assertThatGet('/portal/8.0/doc')->redirect('/documentation/portal-guide/' . Market::getProductByKey('portal')->getLatestVersionToDisplay());
    }

    private function getLatestVersion($version)
    {
        $portalVersions = Market::getProductByKey('portal')->getVersionsToDisplay();
        foreach ($portalVersions as $v) {
            if (StringUtil::startsWith($v, $version)) {
                return $v;
            }
        }
        return null;
    }
    
    private function latestAvailableRelease(): string
    {
        return Market::getProductByKey('portal')->getLatestVersion();
    }
}
