# Axon Ivy Dev Website

## Setup
  
Run `./up.sh` to start the website in docker
  
... and later `docker compose down` to stop the containers.

```bash
# get the backend running
docker compose build --pull
docker compose up -d
docker compose exec web composer install

# build the frontend
docker compose exec web pnpm --dir frontend install --frozen-lockfile
docker compose exec web pnpm --dir frontend build

# get the frontend running in dev mode
docker compose exec web pnpm install
docker compose exec web pnpm run dev
docker compose exec web pnpm run build
```

## Execute tests

Run `./run-tests.sh` to execute tests.

## Issue list for the news pages

- Run https://jenkins.ivyteam.io/job/website-developer_issue-list-generator with the ivy version to release
- Copy and paste the issues from the console log to the files in the news folder

## VSCode

- Install extension **PHP Intelphense** and follow the Quickstart guide

## Update a php library

```bash
// Show outdated dependencies
docKer compose exec web composer show --outdated

// Upgrade dependencies
docker compose exec web composer update --prefer-dist -a --with-all-dependencies
```

## Resources

- Slim Project Bootstrap <https://github.com/kalvn/Slim-Framework-Skeleton>
- SlimFramework <http://www.slimframework.com>
- Template <https://templated.co/introspect>
- JS-Framework <https://github.com/ajlkn/skel>
