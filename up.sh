#/bin/bash

# install php dependencies
docker run --rm --interactive --tty --user $(id -u):$(id -g) --volume $PWD:/app composer install

# build frontend
pnpm --dir frontend install
pnpm --dir frontend run build

# start apache webserver with php module
docker compose build --pull
docker compose up -d
