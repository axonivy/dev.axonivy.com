<?php
namespace app\pages\home;

use app\domain\listing\Crawler;
use Slim\Views\Twig;

class HomeAction
{
  const PRODUCT_URLS = [
    "https://jenkins.ivyteam.io/job/core_product/",
    "https://jenkins.ivyteam.io/job/core-7_product/"
  ];

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    $groups = (new Crawler())->get(self::PRODUCT_URLS);
    return $this->view->render($response, 'home/home.twig', [
      'groups' => $groups
    ]);
  }
}
