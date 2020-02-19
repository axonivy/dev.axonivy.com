<?php
namespace app\market;

class Product
{

    private $key;

    private $name;

    private $description;

    private $mavenArtifacts;

    private $importWizard;
    
    private $versionDisplayFilter;
    
    public function __construct(string $key, string $name, array $mavenArtifacts, string $description, VersionDisplayFilter $versionDisplayFilter, bool $importWizard = true, string $installInstructions = '')
    {
        $this->key = $key;
        $this->name = $name;
        $this->mavenArtifacts = $mavenArtifacts;
        $this->description = $description;
        $this->importWizard = $importWizard;
        $this->versionDisplayFilter = $versionDisplayFilter;
        $this->installInstructions = $installInstructions;
    }

    public function getKey()
    {
        return $this->key;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getImgSrc()
    {
        return '/images/market/' . $this->key . '.png';
    }

    public function getMavenArtifacts(): array
    {
        return $this->mavenArtifacts;
    }

    public function getUrl(): string
    {
        return '/market/' . $this->key;
    }

    public function getImportWizard(): bool
    {
        return $this->importWizard;
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
