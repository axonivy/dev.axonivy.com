FROM php:8.1-apache
 
RUN a2enmod rewrite

ADD docker/prod/000-default.conf /etc/apache2/sites-available/000-default.conf
ADD src /var/www/html/src
ADD vendor /var/www/html/vendor
