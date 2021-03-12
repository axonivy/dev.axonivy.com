#/bin/bash

docker-compose up -d
docker-compose exec web composer install

