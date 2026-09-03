FROM php:8.5-apache
 
RUN a2enmod rewrite

# dependencies used for composer
RUN apt-get update && \
    apt-get install -y git && \
	apt-get install -y zip unzip && \
    apt-get install -y wget

# install php composer
ADD install-composer.sh ./install-composer.sh
RUN chmod ugo+x ./install-composer.sh
RUN ./install-composer.sh

# install Node.js and pnpm for frontend build
RUN wget -qO- https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm

# user for jenkins pipeline
RUN addgroup --gid 1000 build && adduser --uid 1000 --gid 1000 --disabled-password --gecos "" build
RUN usermod -a -G build www-data
