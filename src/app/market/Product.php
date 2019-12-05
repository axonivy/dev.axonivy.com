<?php
namespace app\market;

use \app\util\StringUtil;

class Product
{

    private $key;

    private $name;

    private $description;

    private $mavenArtifacts;

    private $importWizard;
    
    private $showSnapshotVersion;

    public function __construct(string $key, string $name, array $mavenArtifacts, string $description, bool $showSnasphotVersion)
    {
        $this->key = $key;
        $this->name = $name;
        $this->mavenArtifacts = $mavenArtifacts;
        $this->description = $description;
        $this->importWizard = true;
        $this->showSnapshotVersion = $showSnasphotVersion;
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
        if ($this->showSnapshotVersion)
        {
            return $this->getVersions();
        }
        
        $versions = [];
        foreach ($this->getVersions() as $v)
        {
            if (!StringUtil::contains($v, '-SNAPSHOT'))
            {
                $versions[] = $v;
            }
        }
        return $versions;
    }

    public function getLatestVersion(): ?string
    {
        $versions = $this->getVersions();
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
