# Utilisez une image Node.js officielle comme image de base
FROM node:18

# Créez un répertoire pour l'application
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY ./jobapp/package*.json ./

# Installez les dépendances
RUN npm install 

# Copiez le reste des fichiers de l'application
COPY ./jobapp .

# Exposez le port 5173
EXPOSE 5173

CMD ["npm", "run", "dev"]


# Utilisez une image apache officielle comme image de base
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
COPY ./emplois .

# Exposez le port 80
EXPOSE 80

# Redémarrez Apache pour que les changements prennent effet
RUN service apache2 restart