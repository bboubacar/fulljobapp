# Étape 1 : Construire le frontend avec Node.js
FROM node:18 AS frontend-build

# Créez un répertoire pour le frontend
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json pour le frontend
COPY ./jobapp/package*.json ./

# Installez les dépendances du frontend
RUN npm install

# Copiez le reste des fichiers de l'application frontend
COPY ./jobapp .

# Construire le frontend
RUN npm run build

# Étape 2 : Installer PHP et Apache pour l'API
FROM php:8.2-apache

# Activer mod_rewrite pour que RewriteEngine fonctionne dans les fichiers .htaccess
RUN a2enmod rewrite

# Activer les extensions PHP nécessaires pour MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Activez les fichiers .htaccess en modifiant la configuration d'Apache
RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Créez un répertoire pour l'application API
WORKDIR /var/www/html/

# Copier les fichiers de l'API
COPY ./emplois .

# Copier les fichiers du frontend (build) vers un sous-répertoire de l'API
COPY --from=frontend-build /app/dist /var/www/html/frontend

# Installer Supervisord pour gérer plusieurs processus
RUN apt-get update && apt-get install -y supervisor

# Créer un répertoire pour la configuration de Supervisord
RUN mkdir -p /etc/supervisor/conf.d

# Copier la configuration de Supervisord
COPY ./supervisord.conf /etc/supervisor/supervisord.conf

# Exposer les ports
EXPOSE 80 5173

# Commande pour démarrer Supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]