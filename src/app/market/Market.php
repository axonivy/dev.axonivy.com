<?php
namespace app\market;

use app\permalink\MavenArtifactRepository;

class Market
{
    public static function getAll(): array
    {
        $descDocFactory = '
<p>
  The Document Factory is a system that allows generating automatically documents like serial letters with the help of Microsoft Office Templates (.dot or .dotx files).
  The Document Factory is open, can be extended and is based on the Java Library Aspose that is included in Axon.ivy platform.
</p>
';
     
        $descriptionDemo = '
<p>These projects impressively demonstrate the power of the Axon.ivy Digital Business Platform. You can have insights in all features like:</p> 
   <ul>
    <li>Workflow</li>
    <li>Rule Engine</li>
    <li>Connectivity (REST/SOAP)</li>
    <li>Html Dialog</li>
    <li>Error Handling</li>
</ul>

<p>  
    You can also download the demo application which contains all demo projects and drop it in the <i>[engineDir]/deploy</i> folder of an Axon.ivy Engine.
</p>
';
        $descriptionVisualVmPlugin = '
        <p>
        The Axon.ivy VisualVM plugin enables real-time monitoring of an Axon.ivy Engine for:

        <ul>
          <li>HTTP requests</li>
          <li>System database connections and transactions</li>
          <li>REST Calls</li>
          <li>SOAP Web Service Requests</li>
          <li>Slow Queries to to External Databases</li>
          <li>License Information and Violations</li>
        </ul>

        and many more ...

        </p>
        ';

        $visualVmInstallInstructions = '
        <p>
            <ul>
                <li>Make sure that you have an installation of VisualVM. If you use a standalone
                    version of VisualVM, please make sure that you use at least version 1.3.7.</li>
                <li>Run VisualVM (in JDK go to the <code>bin</code> folder and start <code>jvisualvm</code>)</li>
                <li>Go to the <i>Tools/Plugins</i> menu</li>
                <li>Change to <i>Downloaded</i> tab and click on the <i>Add Plugins...</i> button</li>
                <li>In the file chooser that appears, navigate the direcotry with the downloaded <code>visualvm-plugin.nbm</code> and choose it.</li>
                <li>Follow the instructions in the installation wizard.</li>
                <li>Choose the option to restart VisualVM at the end of the installation wizard.</li>       
';
        $portal = self::getPortal();
        $visualVm = new Product('visualvm-plugin', 'VisualVM Plugin', [MavenArtifactRepository::getVisualVMPlugin()], $descriptionVisualVmPlugin, VersionDisplayFilterFactory::createHideSnapshots(), false, $visualVmInstallInstructions);
        $docFactory = new Product('doc-factory', 'Doc Factory', MavenArtifactRepository::getDocFactory(), $descDocFactory, VersionDisplayFilterFactory::createHideSnapshots());
        $demos = new Product('demos', 'Demos', MavenArtifactRepository::getProjectDemos(), $descriptionDemo, VersionDisplayFilterFactory::createShowAll());

        return [$portal, $visualVm, $docFactory, $demos];
    }

    public static function getPortal(): Product {
        $descriptionPortal = '
<p>
  The portal is a complete worklfow user interface that fully exploits all the features of the Axon.ivy Platform
  with a web-based, modern interface the Portal provides you with key functionalities on all your devices:
</p>
<ul>
    <li>Access your / your company’s applications and start new cases</li>
    <li>Manage and fulfil tasks assigned to you or your roles</li>
    <li>Understand what’s going on by using on-the-spot statistics and historic data on all your cases and tasks</li>
    <li>Improve your Axon.ivy Portal experience and efficiency through the built-in customization options</li>
</ul>
';
        return new Product(
            'portal',
            'Portal',
            MavenArtifactRepository::getPortal(),
            $descriptionPortal,
            VersionDisplayFilterFactory::createHidePortalSprintReleases());
    }

    public static function getProductByKey($key): ?Product
    {
        foreach (self::getAll() as $product) {
            if ($key == $product->getKey()) {
                return $product;
            }
        }
        return null;
    }
}
