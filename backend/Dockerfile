# Stage 1: Builder - Dep install
FROM php:8.2-fpm-alpine AS builder

# Php extensions needed
RUN apk add --no-cache \
    bash \
    git \
    unzip \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    && docker-php-ext-install \
    pdo_mysql \
    zip \
    intl \
    opcache

# InstallComposer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Composer config files copy
WORKDIR /app
COPY composer.json composer.lock symfony.lock ./

# Install dependences
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Code copy
COPY . .

# Optimize autoload
RUN composer dump-autoload --optimize --classmap-authoritative

# Symfony cache generation
RUN php bin/console cache:clear --env=prod --no-debug \
    && php bin/console cache:warmup --env=prod --no-debug



# Stage 2: Production - Final Image 
FROM php:8.2-fpm-alpine

# PHP prod extensions
RUN apk add --no-cache \
    bash \
    libzip \
    icu-libs \
    && docker-php-ext-install \
    pdo_mysql \
    opcache

# PHP config optimised for prod.
COPY <<EOF /usr/local/etc/php/conf.d/symfony.ini
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0
realpath_cache_size=4096K
realpath_cache_ttl=600
memory_limit=256M
upload_max_filesize=20M
post_max_size=20M
EOF

# Copy
WORKDIR /app
COPY --from=builder --chown=www-data:www-data /app /app

# Default env
ENV APP_ENV=prod
ENV APP_DEBUG=0

# Exposed Port
EXPOSE 9000

# Non-root user
USER www-data

CMD ["php-fpm"]