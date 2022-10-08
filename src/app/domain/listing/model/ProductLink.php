<?php
namespace app\domain\listing\model;

class ProductLink {

  private String $text;
  private String $url;
  
  public function __construct(String $text, String $url)
  {
    $this->text = $text;
    $this->url = $url;
  }

  public function getText() : String {
    return $this->text;
  }

  public function getUrl() : String {
    return $this->url;
  }
}
