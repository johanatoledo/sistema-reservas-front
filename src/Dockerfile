# Usa Node
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Puerto por defecto de Vite
EXPOSE 5173

# Comando para iniciar Vite en modo host para que Windows lo vea
CMD ["npm", "run", "dev", "--", "--host"]