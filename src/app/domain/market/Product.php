<?php
namespace app\domain\market;

class Product
{
    private string $key;
    private string $path;

    private string $name;
    private bool $listed;
    private int $sort;

    private ?MavenProductInfo $mavenProductInfo;

    public function __construct(string $key, string $path, string $name, bool $listed, int $sort, ?MavenProductInfo $mavenProductInfo)
    {
        $this->key = $key;
        $this->path = $path;
        $this->name = $name;
        $this->listed = $listed;
        $this->sort = $sort;
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
