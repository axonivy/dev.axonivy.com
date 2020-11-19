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
    private array $tags;
    
    private ?MavenProductInfo $mavenProductInfo;

    public function __construct(string $key, string $path, string $name, bool $listed, int $sort, array $installers, array $tags, ?MavenProductInfo $mavenProductInfo)
    {
        $this->key = $key;
        $this->path = $path;
        $this->name = $name;
        $this->listed = $listed;
        $this->sort = $sort;
        $this->installers = $installers;
        $this->tags = $tags;
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
    
    public function getInstallers(): string
    {
        if (empty($this->installers)) {
            return "can-not-install-product";
        }

        $installers = '';
        foreach ($this->installers as $id) {
            $installers .= "$id ";
        }
        return $installers;
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

    public function getMetaUrl(): string
    {
        return $this->assetBaseUrl() . '/meta.json';
    }

    public function getMavenProductInfo(): ?MavenProductInfo
    {
        return $this->mavenProductInfo;
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
