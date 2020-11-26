<?php
namespace app\domain\market;

use app\Config;

class Product
{
    private string $key;
    private string $path;

    private string $name;
    private bool $listed;
    private int $sort;
    private array $tags;
    private string $minVersion;
    private bool $installable;
    
    private ?MavenProductInfo $mavenProductInfo;

    public function __construct(string $key, string $path, string $name, bool $listed, int $sort, array $tags, string $minVersion, bool $installable, ?MavenProductInfo $mavenProductInfo)
    {
        $this->key = $key;
        $this->path = $path;
        $this->name = $name;
        $this->listed = $listed;
        $this->sort = $sort;
        $this->tags = $tags;
        $this->minVersion = $minVersion;
        $this->installable = $installable;
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
    
    public function isInstallable(): bool
    {
        return $this->installable;
    }
    
    public function getMinVersion(): string
    {
        return $this->minVersion;
    }
    
    public function isVersionSupported(string $version): bool
    {
        return version_compare($this->minVersion, $version) <= 0;
    }
    
    public function getDescription(): string
    {
        return $this->getHtmlOfMarkdown('README.md');
    }

    public function getTags(): array
    {
        return $this->tags;
    }

    private function getHtmlOfMarkdown(string $filename): string
    {
        $markdownFile = $this->path . "/$filename";
        if (file_exists($markdownFile)) {
            $markdownContent = file_get_contents($markdownFile);
            return (new ParsedownCustom($this->assetBaseUrl()))->text($markdownContent);
        }
        return '';
    }
    
    private function assetBaseUrl()
    {
        return '/_market/' . $this->key;
    }

    public function getImgSrc()
    {
        return $this->assetBaseUrl() . '/logo.png';
    }
    
    public function getUrl(): string
    {
        return '/market/' . $this->key;
    }

    public function getMetaUrl(string $version): string
    {
        return $this->assetBaseUrl() . "/_meta.json?version=$version";
    }

    public function getMetaJson(): string
    {
        return file_get_contents(Config::marketDirectory() . "/$this->key/meta.json");
    }

    public function getMavenProductInfo(): ?MavenProductInfo
    {
        return $this->mavenProductInfo;
    }

    public function getReasonWhyNotInstallable(string $version): string
    {
        if (! $this->isInstallable()) {
            return 'Product is not installable.';
        } elseif (! $this->isVersionSupported($version)) {
            return 'Your Axon.ivy Designer is too old (' . $version . '). You need ' . $this->getMinVersion() . ' or newer.';
        }
        return '';
    }
}

class ParsedownCustom extends \ParsedownExtra
{
    private String $baseUrl;
    
    public function __construct(String $baseUrl)
    {
        $this->baseUrl = $baseUrl;
    }
    
    protected function inlineImage($Excerpt)
    {
        if ( ! isset($Excerpt['text'][1]) or $Excerpt['text'][1] !== '[')
        {
            return;
        }
        
        $Excerpt['text']= substr($Excerpt['text'], 1);
        
        $Link = $this->inlineLink($Excerpt);
        
        if ($Link === null)
        {
            return;
        }
        
        $imageUrl = $Link['element']['attributes']['href'];
        if (!self::isAbsolute($imageUrl))
        {
           $imageUrl = $this->baseUrl . "/$imageUrl";
        }
        
        $Inline = array(
            'extent' => $Link['extent'] + 1,
            'element' => array(
                'name' => 'img',
                'attributes' => array(
                    'src' => $imageUrl,
                    'alt' => $Link['element']['text'],
                    'class' => 'image fit'
                ),
            ),
        );
        
        $Inline['element']['attributes'] += $Link['element']['attributes'];
        
        unset($Inline['element']['attributes']['href']);
        
        return $Inline;
    }

    private static function isAbsolute($uri)
    {
        return strpos($uri, '://') !== false;
    }
}
