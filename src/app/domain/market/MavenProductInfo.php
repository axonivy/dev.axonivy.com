<?php
namespace app\domain\market;

class MavenProductInfo
{
    private array $mavenArtifacts;
    private bool $importWizard;
    private VersionDisplayFilter $versionDisplayFilter;
    
    public function __construct(array $mavenArtifacts, bool $importWizard, VersionDisplayFilter $versionDisplayFilter)
    {
        $this->mavenArtifacts = $mavenArtifacts;
        $this->importWizard = $importWizard;
        $this->versionDisplayFilter = $versionDisplayFilter;
    }
    
    public function getImportWizard(): bool
    {
        return $this->importWizard;
    }
    
    public function getMavenArtifacts(): array
    {
        return $this->mavenArtifacts;
    }
    
    public function getMavenArtifactsForVersion($version): array
    {
        $artifacts = [];
        foreach ($this->mavenArtifacts as $mavenArtifact) {
            foreach ($mavenArtifact->getVersions() as $v) {
                if ($version == $v) {
                    $artifacts[] = $mavenArtifact;
                }
            }
        }
        return $artifacts;
    }
    
    public function getVersions(): array
    {
        $versions = [];
        foreach ($this->mavenArtifacts as $mavenArtifact) {
            $versions = array_merge($mavenArtifact->getVersions(), $versions);
        }
        $versions = array_unique($versions);
        usort($versions, 'version_compare');
        $versions = array_reverse($versions);
        return $versions;
    }
    
    public function getVersionsToDisplay(): array
    {
        return $this->versionDisplayFilter->versionsToDisplay($this);
    }
    
    public function getLatestVersion(): ?string
    {
        $versions = $this->getVersions();
        if (empty($versions)) {
            return null;
        }
        return $versions[0];
    }
    
    public function getLatestVersionToDisplay(): ?string
    {
        $versions = $this->getVersionsToDisplay();
        if (empty($versions)) {
            return null;
        }
        return $versions[0];
    }
    
    public function hasVersion(string $v): bool
    {
        $versions = $this->getVersions();
        foreach ($versions as $version) {
            if ($version == $v) {
                return true;
            }
        }
        return false;
    }
}

