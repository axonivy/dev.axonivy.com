<?php
namespace app\domain\market;

use app\Config;

class ProductDescription
{

  private string $description;

  private string $demo;

  private string $setup;

  private function __construct(string $description, string $demo, string $setup)
  {
    $this->description = $description;
    $this->demo = $demo;
    $this->setup = $setup;
  }

  public static function create(Product $product, string $version): ProductDescription
  {
    $assetBaseUrl = $product->assetBaseUrlReadme($version);
    
    // load versionized README from product repo
    $file = $product->getProductFile($version, 'README.md');
    if (file_exists($file)) {
      return self::createByFile($file, $assetBaseUrl); 
    }
    
    // load README from market repo
    $file = $product->getMarketFile('README.md');
    if (file_exists($file)) {
      return self::createByFile($file, $assetBaseUrl); 
    }
    
    // load README from another version
    $artifactId = $product->getProductArtifactId();
    if (!empty($artifactId)) {
      $dir = Config::marketCacheDirectory() . "/" . $product->getKey() . "/$artifactId/*";
      $dirs = array_filter(glob($dir), 'is_dir');
      foreach ($dirs as $dir) {
        $readme = $dir . '/README.md';
        if (file_exists($readme)) {
          $assetBaseUrl = $product->assetBaseUrlReadme(basename($dir));
          $desc = self::createByFile($readme, $assetBaseUrl);
          $desc->demo = '';
          $desc->setup = '';
          return $desc;
        }
      }
    }

    return new ProductDescription('', '', '');
  }
  
  public static function createByFile(string $markdownFile, string $assetBaseUrl): ProductDescription
  {
    $markdownContent = file_get_contents($markdownFile);
    $setupContent = explode('## Setup', $markdownContent);
    $demoContent = explode("## Demo", $setupContent[0] ?? '');
    $description = self::getHtmlOfMarkdown($assetBaseUrl, $demoContent, 0);
    $demo = self::getHtmlOfMarkdown($assetBaseUrl, $demoContent, 1);
    $setup = self::getHtmlOfMarkdown($assetBaseUrl, $setupContent, 1);
    return new ProductDescription($description, $demo, $setup);
  }

  public function getDescription(): string
  {
    return $this->description;
  }

  public function getDemo(): string
  {
    return $this->demo;
  }

  public function getSetup(): string
  {
    return $this->setup;
  }

  private static function getHtmlOfMarkdown(string $assetBaseUrl, array $content, int $index): string
  {
    $markdownContent = $content[$index] ?? '';
    if (empty($markdownContent)) {
      return '';
    }
    return (new ParsedownCustom($assetBaseUrl))->text($markdownContent);
  }
}

class ParsedownCustom extends \ParsedownExtra
{

  private string $baseUrl;

  public function __construct(string $baseUrl)
  {
    $this->baseUrl = $baseUrl;
  }

  protected function inlineImage($Excerpt)
  {
    if (! isset($Excerpt['text'][1]) or $Excerpt['text'][1] !== '[') {
      return;
    }

    $Excerpt['text'] = substr($Excerpt['text'], 1);

    $Link = $this->inlineLink($Excerpt);

    if ($Link === null) {
      return;
    }

    $imageUrl = $Link['element']['attributes']['href'];
    if (! self::isAbsolute($imageUrl)) {
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
        )
      )
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

