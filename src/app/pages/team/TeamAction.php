<?php

namespace app\pages\team;

use Slim\Views\Twig;

class TeamAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    return $this->view->render($response, 'team/team.twig', [
      'employees' => self::getMembers()
    ]);
  }

  private static function getMembers(): array
  {
    $jsonFile = __DIR__ . DIRECTORY_SEPARATOR . 'members.json';
    $members = json_decode(file_get_contents($jsonFile));
    shuffle($members);
    return $members;
  }
}
