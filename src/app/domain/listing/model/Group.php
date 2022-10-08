<?php
namespace app\domain\listing\model;

class Group {

  private String $text;
  private String $link;
  private array $links;
  
  public function __construct(String $text, String $link, array $links)
  {
    $this->text = $text;
    $this->link = $link;
    $this->links = $links;
  }

  public function getText() : String {
    return $this->text;
  }

  public function getLink() : String {
    return $this->link;
  }

  public function getLinks() : array {
    return $this->links;
  }
}
