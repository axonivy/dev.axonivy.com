<?php
namespace app\permalink;

class MavenArtifactRepository
{
    public static function getMavenArtifact($key, $type): ?MavenArtifact
    {
        $artifacts = self::getAll();
        foreach ($artifacts as $artifact) {
            if ($artifact->getKey() == $key && $artifact->getType() == $type) {
                return $artifact;
            }
        }
        return null;
    }
    
    private static function getAll(): array
    {
        return array_merge(
            self::getProjectDemos(),
            [self::getProcessingValve()],
            [self::getJsfWorkflowUi()],
            self::getPortal(),
            self::getDocFactory()
        );
    }
    
    public static function getDocs()
    {
        $all = self::getAll();
        $docs = [];
        foreach ($all as $a) {
            if ($a->isDocumentation()) {
                $docs[] = $a;
            }
        }
        return $docs;
    }

    public static function getPortal(): array
    {
        return [
            self::getPortalApp(),
            self::getPortalTemplate(),
            self::getPortalStyle(),
            self::getPortalKit(),
            self::getAxonIvyExpress(),
            self::getPortalExamples(),
            self::getPortalGuide(),
            self::getPortalUserGuide(),
            self::getPortalDeveloperGuide()
        ];
    }
    
    public static function getDocFactory(): array
    {
        return [
            self::getDocFactoryProject(),
            self::getDocFactoryDemo(),
            self::getDocFactoryDoc()
        ];
    }

    public static function getProjectDemos(): array
    {
        return [
            self::getQuickStartTutorial(),
            self::getWorkflowDemos(),
            self::getErrorHandlingDemos(),
            self::getConnectivityDemos(),
            self::getRuleEngineDemos(),
            self::getHtmlDialogDemos(),
            self::getDemosApp()
        ];
    }

    private static function getQuickStartTutorial(): MavenArtifact
    {
        return MavenArtifact::create('quick-start-tutorial')
            ->name('Quick Start Tutorial')
            ->groupId('ch.ivyteam.ivy.project.demo')
            ->artifactId('quick-start-tutorial')
            ->build();
    }

    private static function getWorkflowDemos(): MavenArtifact
    {
        return MavenArtifact::create('workflow-demos')
            ->name('Workflow Demos')
            ->groupId('ch.ivyteam.ivy.project.demo')
            ->artifactId('workflow-demos')
            ->build();
    }

    private static function getErrorHandlingDemos(): MavenArtifact
    {
        return MavenArtifact::create('error-handling-demos')
            ->name('Error Handling Demos')
            ->groupId('ch.ivyteam.ivy.project.demo')
            ->artifactId('error-handling-demos')
            ->build();
    }

    private static function getConnectivityDemos(): MavenArtifact
    {
        return MavenArtifact::create('connectivity-demos')
            ->name('Connectivity Demos')
            ->groupId('ch.ivyteam.ivy.project.demo')
            ->artifactId('connectivity-demos')
            ->build();
    }

    private static function getRuleEngineDemos(): MavenArtifact
    {
        return MavenArtifact::create('rule-engine-demos')
            ->name('Rule Engine Demos')
            ->groupId('ch.ivyteam.ivy.project.demo')
            ->artifactId('rule-engine-demos')
            ->build();
    }

    private static function getHtmlDialogDemos(): MavenArtifact
    {
        return MavenArtifact::create('html-dialog-demos')
            ->name('Html Dialog Demos')
            ->groupId('ch.ivyteam.ivy.project.demo')
            ->artifactId('html-dialog-demos')
            ->build();
    }

    private static function getDemosApp(): MavenArtifact
    {
        return MavenArtifact::create('demos')
            ->name('Demo App')
            ->groupId('ch.ivyteam.ivy.project.demo')
            ->artifactId('ivy-demos-app')
            ->type('zip')
            ->build();
    }
    
    private static function getPortalApp(): MavenArtifact
    {
        return MavenArtifact::create('portal')
            ->name('Portal App')
            ->groupId('ch.ivyteam.ivy.project.portal')
            ->artifactId('portal-app')
            ->type('zip')
            ->build();
    }

    private static function getPortalTemplate(): MavenArtifact
    {
        return MavenArtifact::create('portal-template')
            ->name('Portal Template')
            ->groupId('ch.ivyteam.ivy.project.portal')
            ->artifactId('portalTemplate')
            ->makesSenseAsMavenDependency()
            ->build();
    }

    private static function getPortalStyle(): MavenArtifact
    {
        return MavenArtifact::create('portal-style')
            ->name('Portal Style')
            ->groupId('ch.ivyteam.ivy.project.portal')
            ->artifactId('portalStyle')
            ->build();
    }

    private static function getPortalKit(): MavenArtifact
    {
        return MavenArtifact::create('portal-kit')
            ->name('Portal Kit')
            ->groupId('ch.ivyteam.ivy.project.portal')
            ->artifactId('portalKit')
            ->build();
    }

    private static function getAxonIvyExpress(): MavenArtifact
    {
        return MavenArtifact::create('axonivy-express')
            ->name('Axon.ivy Express')
            ->groupId('ch.ivyteam.ivy.project.portal')
            ->artifactId('axonIvyExpress')
            ->build();
    }

    private static function getPortalExamples(): MavenArtifact
    {
        return MavenArtifact::create('portal-examples')
            ->name('Portal Examples')
            ->groupId('ch.ivyteam.ivy.project.portal')
            ->artifactId('portalExamples')
            ->build();
    }
    
    private static function getPortalGuide(): MavenArtifact
    {
        return MavenArtifact::create('portal-guide')
        ->name('Portal Guide')
        ->groupId('ch.ivyteam.ivy.project.portal')
        ->artifactId('portal-guide')
        ->type('zip')
        ->doc()
        ->build();
    }
    
    /**
     * since 8.0.1 -> portalGuide
     */
    private static function getPortalUserGuide(): MavenArtifact
    {
        return MavenArtifact::create('portal-user-guide')
            ->name('Portal User Guide')
            ->groupId('ch.ivyteam.ivy.project.portal')
            ->artifactId('portal-user-guide')
            ->type('zip')
            ->doc()
            ->build();
    }
    
    /**
     * since 8.0.1 -> portalGuide
     */
    private static function getPortalDeveloperGuide(): MavenArtifact
    {
        return MavenArtifact::create('portal-developer-guide')
            ->name('Portal Developer Guide')
            ->groupId('ch.ivyteam.ivy.project.portal')
            ->artifactId('portal-developer-guide')
            ->type('zip')
            ->doc()
            ->build();
    }

    private static function getProcessingValve(): MavenArtifact
    {
        return MavenArtifact::create('processing-valve')
            ->name('Processing Valve Demo')
            ->groupId('com.acme')
            ->artifactId('com.acme.ProcessingValve')
            ->type('jar')
            ->build();
    }

    private static function getJsfWorkflowUi(): MavenArtifact
    {
        return MavenArtifact::create('jsf-workflow-ui')
            ->name('JSF Workflow UI')
            ->groupId('ch.ivyteam.ivy.project.wf')
            ->artifactId('JsfWorkflowUi')
            ->build();
    }

    private static function getDocFactoryProject(): MavenArtifact
    {
        return MavenArtifact::create('doc-factory')
            ->name('Doc Factory')
            ->groupId('ch.ivyteam.ivy.addons')
            ->artifactId('doc-factory')
            ->makesSenseAsMavenDependency()
            ->build();
    }

    private static function getDocFactoryDemo(): MavenArtifact
    {
        return MavenArtifact::create('doc-factory-demo')
            ->name('Doc Factory Demo')
            ->groupId('ch.ivyteam.ivy.addons')
            ->artifactId('doc-factory-demos')
            ->build();
    }

    private static function getDocFactoryDoc(): MavenArtifact
    {
        return MavenArtifact::create('doc-factory-doc')
            ->name('Doc Factory Documentation')
            ->groupId('ch.ivyteam.ivy.addons')
            ->artifactId('doc-factory-doc')
            ->type('zip')
            ->doc()
            ->build();
    }
}
