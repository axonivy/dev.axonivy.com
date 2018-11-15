<?php
namespace app\permalink;

class MavenArtifact
{
    public static function getMavenArtifact($name): ?MavenArtifact {
        $artifacts = self::getAll();
        foreach ($artifacts as $artifact) {
            if ($artifact->getName() == $name) {
                return $artifact;
            }
        }
        return null;        
    }
    
    private static function getAll(): array
    {
        $artifacts = array_merge(
            self::getWorkflowUis(), 
            self::getProjectDemos(), 
            self::getDemoApps()
        );
        $artifacts[] = self::getProjectDemosApp();
        return $artifacts;
    }
        
    public static function getProjectDemos(): array
    {
        $groupdId = 'ch.ivyteam.ivy.project.demo';
        return [
            new MavenArtifact('quick-start-tutorial', $groupdId, 'QuickStartTutorial', 'iar'),
            new MavenArtifact('workflow-demos', $groupdId, 'WorkflowDemos', 'iar'),
            new MavenArtifact('error-handling-demos', $groupdId, 'ErrorHandlingDemos', 'iar'),
            new MavenArtifact('connectivity-demos', $groupdId, 'ConnectivityDemos', 'iar'),
            new MavenArtifact('rule-engine-demos', $groupdId, 'RuleEngineDemos', 'iar')
        ];
    }
        
    public static function getProjectDemosApp(): MavenArtifact
    {
        return new MavenArtifact('demos', 'ch.ivyteam.ivy.project', 'IvyDemoApp', 'zip');
    }
    
    public static function getWorkflowUis(): ?array
    {
        $groupdId = 'ch.ivyteam.ivy.project.wf';
        return [
            new MavenArtifact('jsf-workflow-ui', $groupdId, 'JsfWorkflowUi', 'iar'),
            new MavenArtifact('html-workflow-ui', $groupdId, 'HtmlWfUi', 'iar'),
        ];
    }
        
    private static function getDemoApps(): ?array
    {
        return [
            new MavenArtifact('demo-app', 'ch.ivyteam.ivy.project.demo.ci.deploy.application', 'application', 'zip'),
        ];
    }
    
    private $name;
    
    private $groupId;
    private $artifactId;
    private $type;
    
    public function __construct($name, $groupId, $artifactId, $type)
    {
        $this->name = $name;
        $this->groupId = $groupId;
        $this->artifactId = $artifactId;
        $this->type = $type;
    }
    
    private function getName(): string
    {
        return $this->name;
    }
    
    public function getGroupId(): string
    {
       return $this->groupId;
    }
    
    public function getArtifactId(): string
    {
        return $this->artifactId;
    }
    
    public function getDisplayName(): string
    {
        return ucwords(str_replace('-', ' ', $this->name));
    }
    
    public function getPermalinkDev()
    {
        return '/permalink/lib/dev/' . $this->name . '.' . $this->type;
    }
}
