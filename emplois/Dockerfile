# Utilisez une image Node.js officielle comme image de base
FROM php:8.2-apache

# Activer mod_rewrite pour que RewriteEngine fonctionne dans les fichiers .htaccess
RUN a2enmod rewrite

# Activer les extensions PHP nécessaires pour MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Activez les fichiers .htaccess en modifiant la configuration d'Apache
RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Créez un répertoire pour l'application
WORKDIR /var/www/html/

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port 80
EXPOSE 80

# Redémarrez Apache pour que les changements prennent effet
RUN service apache2 restart