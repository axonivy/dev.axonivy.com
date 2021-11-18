<?php
namespace app\domain\market;

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
    $markdownFile = $product->getReadmeFile($version);
    if (!file_exists($markdownFile)) {
      return new ProductDescription('', '', '');
    }
    $assetBaseUrl = $product->assetBaseUrlReadme($version);
    return self::createByFile($markdownFile, $assetBaseUrl);    
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

