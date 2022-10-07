FROM php:8.1-apache
 
RUN a2enmod rewrite

# dependencies used for composer
RUN apt-get update && \
    apt-get install -y git zip unzip wget && \
    rm -rf /var/lib/apt/lists/*``

# install php composer
ADD install-composer.sh ./install-composer.sh
RUN chmod ugo+x ./install-composer.sh
RUN ./install-composer.sh

# configure apache
ADD 000-default.conf /etc/apache2/sites-available/000-default.conf

# user for jenkins pipeline
RUN addgroup --gid 1000 build && adduser --uid 1000 --gid 1000 --disabled-password --gecos "" build
RUN usermod -a -G build www-data
