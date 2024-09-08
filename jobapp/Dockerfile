# Utilisez une image Node.js officielle comme image de base
FROM node:18

# Créez un répertoire pour l'application
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port 5173
EXPOSE 5173

CMD ["npm", "run", "dev"]