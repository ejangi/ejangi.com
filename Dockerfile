FROM wordpress

RUN apt-get update && apt-get -y install zip

RUN curl https://getcomposer.org/download/1.6.5/composer.phar -o composer \
    && mv composer /usr/bin/composer \
    && chmod +x /usr/bin/composer \
    && composer self-update