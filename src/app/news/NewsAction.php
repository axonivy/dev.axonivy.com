<?php
namespace app\news;

use Psr\Container\ContainerInterface;
use Slim\Exception\HttpNotFoundException;

class NewsAction
{

    protected $view;

    public function __construct(ContainerInterface $container)
    {
        $this->view = $container->get('view');
    }

    public function __invoke($request, $response, $args)
    {
        $version = $args['version'] ?? "";

        if (empty($version)) {
            $news = NewsRepository::all();
            return $this->view->render($response, 'app/news/news.html', ['news' => $news]);
        }

        $news = NewsRepository::find($version);
        if ($news == null) {
            throw new HttpNotFoundException($request);   
        }

        return $this->view->render($response, 'app/news/news-detail-page.html', [
            'version' => $version,
            'news' => $news
        ]);
    }
}

class NewsRepository
{
    public static function all(): array
    {
        $news = [];
        $dirs = glob(__DIR__ . '/*', GLOB_ONLYDIR);
        foreach ($dirs as $dir) {
            $new = self::find(basename($dir));
            if ($new->getMeta()->released) {
                $news[] = $new;
            }
        }
        return array_reverse($news);
    }

    public static function find($version): ?News 
    {
        $directory = __DIR__ . "/$version";
        if (file_exists($directory))
        {
            return self::transform($version);
        }
        return null;
    }

    private static function transform(String $version): News
    {
        $directory = __DIR__ . "/$version";
        
        $sections = [];
        foreach (glob("$directory/*.md") as $markdownFile) {
            $markdown = file_get_contents($markdownFile);
            $html = \ParsedownExtra::instance()->text($markdown);
            
            $images = self::loadImages($version, $markdownFile);
            $sections[] = new NewsDetailSection($html, $images);
        }

        $meta = json_decode(file_get_contents(__DIR__ . "/$version/meta.json"));
        $snippet = file_get_contents(__DIR__ . "/$version/snippet.html");
        return new News($version, $meta, $snippet, $sections);
    }

    private static function loadImages(String $version, String $markdownFile): array
    {
        $markdownFileWithoutExtension = pathinfo($markdownFile, PATHINFO_FILENAME);
        $markdownFileWithoutExtensionAndPrefix = substr($markdownFileWithoutExtension, 3);
        $directory = __DIR__ . "/../../web/images/news/$version/$markdownFileWithoutExtensionAndPrefix";
        
        $imageUrls = [];
        foreach (glob($directory . '/*') as $imagePath)
        {
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
    private $snippet;
    private $newsDetailSections;
    
    public function __construct(String $version, $meta, String $snippet, array $newsDetailSections)
    {
        $this->version = $version; 
        $this->snippet = $snippet;
        $this->meta = $meta;
        $this->newsDetailSections = $newsDetailSections;
    }

    public function getMeta()
    {
        return $this->meta;
    }

    public function getSnippet()
    {
        return $this->snippet;
    }
    
    public function getNewsDetailSections(): array
    {
        return $this->newsDetailSections;
    }
    
    public function getLink(): String
    {
        return "/news/$this->version";
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
