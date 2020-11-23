<?php
namespace app\pages\market;

use Slim\Exception\HttpNotFoundException;
use Slim\Views\Twig;
use app\domain\market\Market;
use app\domain\market\Product;
use Slim\Psr7\Request;

class ProductAction
{

    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke($request, $response, $args) {
        $key = $args['key'] ?? '';
        $product = Market::getProductByKey($key);
        if ($product == null) {
            throw new HttpNotFoundException($request);
        }
        
        $mavenProductInfo = $product->getMavenProductInfo();
        $version = $args['version'] ?? '';
        $mavenArtifactsAsDependency = [];
        $mavenArtifacts = [];
        $docArtifacts = [];
        
        if ($mavenProductInfo != null)
        {
            if (empty($version)) {
                $version = $mavenProductInfo->getLatestVersionToDisplay();
            } else if (!$mavenProductInfo->hasVersion($version)) {
                throw new HttpNotFoundException($request);
            }
            
            $mavenArtifacts = $mavenProductInfo->getMavenArtifactsForVersion($version);
            foreach ($mavenArtifacts as $artifact) {
                if ($artifact->getMakesSenseAsMavenDependency()) {
                    $mavenArtifactsAsDependency[] = $artifact;
                }
            }
            
            foreach ($mavenArtifacts as $artifact) {
                if ($artifact->isDocumentation() && $artifact->docExists($version)) {
                    $docArtifacts[] = $artifact;
                }
            }
        }
        
        $installButton = self::createInstallButton($request, $product);
        
        return $this->view->render($response, 'market/product.twig', [
            'product' => $product,
            'mavenProductInfo' => $mavenProductInfo,
            'mavenArtifacts' => $mavenArtifacts,
            'mavenArtifactsAsDependency' => $mavenArtifactsAsDependency,
            'docArtifacts' => $docArtifacts,
            'selectedVersion' => $version,
            'installButton' => $installButton
        ]);
    }

    private static function createInstallButton(Request $request, Product $product): InstallButton
    {
        $uri = $request->getUri();
        $metaUrl = $uri->getScheme() . '://' . $uri->getHost() . $product->getMetaUrl();

        $cookies = $request->getCookieParams();
        $version = $cookies['ivy-version'] ?? '';

        $show = !empty($version);
        $reason = $product->getReasonWhyNotInstallable($version);
        return new InstallButton($show, $reason, $metaUrl);
    }
}

class InstallButton
{
    public bool $show;

    public string $reason;

    private string $metaUrl;

    function __construct(bool $show, string $reason, string $metaUrl)
    {
        $this->show = $show;
        $this->reason = $reason;
        $this->metaUrl = $metaUrl;
    }

    public function isEnabled(): bool
    {
        return empty($this->reason);
    }
    
    public function getJavascriptCallback(): string
    {
        return "install('". $this->metaUrl ."')";
    }
}
