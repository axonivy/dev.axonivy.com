<?php

namespace app;

use app\pages\team\TeamAction;

class RoutingRules
{
  public static function installRoutes($app)
  {
    $app->get('/', TeamAction::class);
  }
}
