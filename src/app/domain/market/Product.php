<?php
namespace app\domain\market;

use app\domain\maven\MavenArtifactRepository;

class Product
{

    private $key;

    private $name;

    private $mavenArtifacts;

    private $importWizard;
    
    private $versionDisplayFilter;

    private $listed;
    
    public function __construct(string $key, string $infoFile)
    {
       $infoFileContent = file_get_contents($infoFile);
       $infoJson = json_decode($infoFileContent);
       $this->key = $key;
       $this->name = $infoJson->name;
       $this->mavenArtifacts = array_map(fn ($mavenArtifactKey) => MavenArtifactRepository::getByKey($mavenArtifactKey), $infoJson->mavenArtifacts);
       $this->importWizard = $infoJson->importWizard;
       $this->versionDisplayFilter = VersionDisplayFilterFactory::create($infoJson->versionDisplay);
       $this->listed = $infoJson->listed;
    }

    public function getKey()
    {
        return $this->key;
    }

    public function isListed()
    {
        return $this->listed;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->getHtmlOfMarkdown('description.md');
    }

    public function getInstructions(): string
    {
        return $this->getHtmlOfMarkdown('instructions.md');
    }

    private function getHtmlOfMarkdown(string $filename): string
    {
        $markdownFile = dirname(__FILE__) . '/products/' . $this->key . '/' . $filename;
        if (file_exists($markdownFile)) {
            $markdownContent = file_get_contents($markdownFile);
            return \ParsedownExtra::instance()->text($markdownContent);
        }
        return '';
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
