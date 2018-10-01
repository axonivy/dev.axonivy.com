FROM php:7.2.4-apache
 
RUN a2enmod rewrite

# used for composer
RUN apt-get update && \
    apt-get install -y git && \
	apt-get install -y zip unzip && \
    apt-get install -y wget

# download composer install script
ADD install-composer.sh ./install-composer.sh
RUN chmod ugo+x ./install-composer.sh
RUN ./install-composer.sh

# install composer
RUN php ./composer-setup.php --version=1.6.3 --install-dir=/var
RUN php -r "unlink('composer-setup.php');"
RUN mv /var/composer.phar /usr/local/bin/composer

# user for jenkins pipeline
RUN addgroup --gid 1000 build && adduser --uid 1000 --gid 1000 --disabled-password --gecos "" build
