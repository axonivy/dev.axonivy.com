<?php
namespace app\domain\market;

class Product
{
    private string $key;
    private string $path;

    private string $name;
    private bool $listed;
    private int $sort;
    private array $installers;
    
    private ?MavenProductInfo $mavenProductInfo;

    public function __construct(string $key, string $path, string $name, bool $listed, int $sort, array $installers, ?MavenProductInfo $mavenProductInfo)
    {
        $this->key = $key;
        $this->path = $path;
        $this->name = $name;
        $this->listed = $listed;
        $this->sort = $sort;
        $this->installers = $installers;
        $this->mavenProductInfo = $mavenProductInfo;
    }
    
    public function getKey(): string
    {
        return $this->key;
    }
    
    public function isListed(): bool
    {
        return $this->listed;
    }

    public function getName(): string
    {
        return $this->name;
    }
    
    public function getSort(): int
    {
        return $this->sort;
    }
    
    public function getDescription(): string
    {
        return $this->getHtmlOfMarkdown('README.md');
    }
    
    public function getInstallation(): string
    {
        return $this->getHtmlOfMarkdown('INSTALLATION.md');
    }

    public function getInstallers(): string
    {
        if (empty($this->installers)) {
            return "can-not-install-product";
        }
        
        $installers = ' ';
        foreach ($this->installers as $id) {
            $installers .= "$id ";
        }        
        return $installers;
    }

    private function getHtmlOfMarkdown(string $filename): string
    {
        $markdownFile = $this->path . "/$filename";
        if (file_exists($markdownFile)) {
            $markdownContent = file_get_contents($markdownFile);
            return \ParsedownExtra::instance()->text($markdownContent);
        }
        return '';
    }

    public function getImgSrc()
    {
        return '/_market/' . $this->key . '/logo.png';
    }
    
    public function getUrl(): string
    {
        return '/market/' . $this->key;
    }

    public function getMetaUrl(): string
    {
        return  '/_market/' . $this->key . '/meta.json';
    }

    public function getMavenProductInfo(): ?MavenProductInfo
    {
        return $this->mavenProductInfo;
    }
}
