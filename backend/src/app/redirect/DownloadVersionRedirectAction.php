<?php

namespace app\redirect;

use app\domain\util\Redirect;

class DownloadVersionRedirectAction
{

  public function __invoke($request, $response, $args)
  {
    return Redirect::to($response, '/download');
  }
}
