#!/bin/bash

docker compose exec -u www-data web ./vendor/bin/phpunit
