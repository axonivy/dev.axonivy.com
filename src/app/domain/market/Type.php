<?php

namespace app\domain\market;

class Type
{
  private string $name;
  private string $filter;
  private string $icon;

  public function __construct(string $name, string $filter, string $icon)
  {
    $this->name = $name;
    $this->filter = $filter;
    $this->icon = $icon;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getFilter(): string
  {
    return $this->filter;
  }

  public function getIcon(): string
  {
    return $this->icon;
  }

}
