# Use the official PHP image with PHP-FPM
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    curl

# Install PHP extensions required by Laravel (e.g., PDO for database)
RUN docker-php-ext-install pdo pdo_mysql

# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy existing application directory contents
COPY . /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
