<?php
namespace app\domain\listing;

use app\domain\listing\model\Group;

class Crawler {

  public function get(array $productBuildUrls): array
  {
    $buildJobUrls = $this->crawlBuildJobUrls($productBuildUrls);
    return $this->collectProductLinks($buildJobUrls);
  }

  private function crawlBuildJobUrls(array $productBuildUrls): array
  {
    $buildJobUrls = [];
    foreach ($productBuildUrls as $productBuildUrl) {
      $urls = (new BuildJobUrlCrawler($productBuildUrl))->crawl();
      $buildJobUrls = array_merge($buildJobUrls, $urls);
    }
    return $buildJobUrls;
  }

  private function collectProductLinks(array $buildJobUrls): array
  {
    $groups = [];
    foreach ($buildJobUrls as $buildJobUrl) {
      $group = (new ProductLinksCollector($buildJobUrl))->get();
      if ($group != null) {
        $groups[] = $group;
      }
    }
    usort($groups, fn(Group $a, Group $b) => strcmp($b->getText(), $a->getText()));
    return $groups;
  }
}
