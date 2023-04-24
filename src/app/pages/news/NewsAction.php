<?php

namespace app\pages\news;

use Slim\Exception\HttpNotFoundException;
use Slim\Views\Twig;
use app\domain\ReleaseInfoRepository;
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\Attributes\AttributesExtension;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\MarkdownConverter;

class NewsAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    $version = $args['version'] ?? "";

    if (empty($version)) {
      $news = NewsRepository::allReleased();
      return $this->view->render($response, 'news/news.twig', ['news' => $news]);
    }

    $news = NewsRepository::find($version);
    if ($news == null) {
      throw new HttpNotFoundException($request);
    }

    return $this->view->render($response, 'news/news-detail-page.twig', [
      'version' => $version,
      'news' => $news
    ]);
  }

  public static function exists(string $version) {
    return NewsRepository::find($version) != null;
  }
}

class NewsRepository
{
  public static function allReleased(): array
  {
    $news = [];
    $dirs = glob(__DIR__ . '/*', GLOB_ONLYDIR);
    foreach ($dirs as $dir) {
      $dirName = basename($dir);
      $new = self::find($dirName);
      if ($new->isReleased()) {
        $news[$dirName] = $new;
      }
    }
    ksort($news);
    return array_reverse($news);
  }

  public static function find($version): ?News
  {
    $directory = __DIR__ . "/$version";
    if (file_exists($directory)) {
      return self::transform($version);
    }
    return null;
  }

  private static function transform(String $version): News
  {
    $directory = __DIR__ . "/$version";

    $isReleased = ReleaseInfoRepository::isReleased($version);

    $config = [];
    $environment = new Environment($config);
    $environment->addExtension(new CommonMarkCoreExtension());
    $environment->addExtension(new AttributesExtension());
    $converter = new MarkdownConverter($environment);

    $sections = [];
    foreach (glob("$directory/*.md") as $markdownFile) {
      $markdown = file_get_contents($markdownFile);
      $docBaseUrl = $isReleased ? "/doc/$version" : '/doc/dev';
      $markdown = str_replace('${docBaseUrl}', $docBaseUrl, $markdown);
      $html = $converter->convert($markdown);

      $images = self::loadImages($version, $markdownFile);
      $sections[] = new NewsDetailSection($html, $images);
    }

    $meta = json_decode(file_get_contents(__DIR__ . "/$version/meta.json"));
    $abstract = file_get_contents(__DIR__ . "/$version/abstract.html");
    return new News($version, $meta, $abstract, $isReleased, $sections);
  }

  private static function loadImages(String $version, String $markdownFile): array
  {
    $markdownFileWithoutExtension = pathinfo($markdownFile, PATHINFO_FILENAME);
    $markdownFileWithoutExtensionAndPrefix = substr($markdownFileWithoutExtension, 3);

    $imagesNewsDir = __DIR__ . "/../../../web/images/news";
    if (!file_exists($imagesNewsDir)) {
      throw new \RuntimeException("$imagesNewsDir does not exist");
    }

    $directory = "$imagesNewsDir/$version/$markdownFileWithoutExtensionAndPrefix";

    $imageUrls = [];
    foreach (glob($directory . '/*') as $imagePath) {
      $imageFile = pathinfo($imagePath, PATHINFO_BASENAME);
      $imageUrls[] = "/images/news/$version/$markdownFileWithoutExtensionAndPrefix/$imageFile";
    }
    return $imageUrls;
  }
}

class News
{
  private $version;
  private $meta;
  private $abstract;
  private $isReleased;
  private $newsDetailSections;

  public function __construct(String $version, $meta, String $abstract, bool $isReleased, array $newsDetailSections)
  {
    $this->version = $version;
    $this->abstract = $abstract;
    $this->meta = $meta;
    $this->isReleased = $isReleased;
    $this->newsDetailSections = $newsDetailSections;
  }

  public function getMeta()
  {
    return $this->meta;
  }

  public function getAbstract()
  {
    return $this->abstract;
  }

  public function getNewsDetailSections(): array
  {
    return $this->newsDetailSections;
  }

  public function getLink(): String
  {
    return "/news/$this->version";
  }

  public function getLinkDoc(): String
  {
    return "/doc/$this->version";
  }

  public function getLinkMigiNote(): String
  {
    return "/doc/$this->version/migration-notes";
  }

  public function isReleased(): bool
  {
    return $this->isReleased;
  }
}

class NewsDetailSection
{
  private $html;
  private $images;

  public function __construct(String $html, array $images)
  {
    $this->html = $html;
    $this->images = $images;
  }

  public function getHtml(): String
  {
    return $this->html;
  }

  public function getImages(): array
  {
    return $this->images;
  }
}
