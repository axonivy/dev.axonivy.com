FROM php:8.5-apache
ADD 000-default.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite
