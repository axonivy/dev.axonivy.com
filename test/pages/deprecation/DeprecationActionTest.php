<?php

namespace test\pages\deprecation;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DeprecationActionTest extends TestCase
{
    
    public function testRender()
    {
        AppTester::assertThatGet('/features/deprecation')
        ->ok()
        ->bodyContains('<h1>Deprecation and Removal</h1>');
    }
    
    public function testRender_RIAFeature()
    {
        AppTester::assertThatGet('/features/deprecation')
        ->ok()
        ->bodyContainsIgnoreWhitespaces(
          '<tr>
            <td><a href="/doc/7.0/DesignerGuideHtml/ivy.userinterface.html#ivy-richdialogs">RIA / Rich Dialog</a></td>
            <td><a href="/doc/9.3/designer-guide/user-interface/user-dialogs/html-dialogs.html">Html Dialog</a></td>
            <td class="deprecation-icon"><span class=""></span></td>
            <td class="deprecation-icon"><span class="deprecation-released"></span></td>
            <td class="deprecation-icon"><span class="deprecation-ok"></span></td>
            <td class="deprecation-icon"><span class="deprecation-ok"></span></td>
            <td class="deprecation-icon"><span class="deprecation-deprecated"></span></td>
            <td class="deprecation-icon"><span class="deprecation-removed"></span></td>
            <td class="deprecation-icon"><span class=""></span></td>
            <td class="deprecation-icon"><span class=""></span></td>
            <td class="deprecation-icon"><span class=""></span></td>
          </tr>');
    }

    public function testRender_featureDeprecation()
    {
        AppTester::assertThatGet('/features/deprecation')
          ->ok()
          ->bodyContainsIgnoreWhitespaces('<span title="The Java library Guava is provided on the ivy project classpath and will be removed. Use the utilities from the JDK." class="deprecation-info"></span>');
    }

    public function testRender_Versions()
    {
        AppTester::assertThatGet('/features/deprecation')
        ->ok()
        ->bodyContainsIgnoreWhitespaces(
            '<tr class="versions">
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9.1</th>
              <th>9.2</th>
              <th>9.3</th>
            </tr>');
    }
}
