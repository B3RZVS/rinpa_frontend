# Etapa 1: Construir la aplicación React con Vite
FROM node:18-alpine AS build  
# Cambiado de node:16-alpine a node:18-alpine

WORKDIR /app


# Copiamos solo lo necesario para aprovechar el cache
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar el resto del código
COPY . .

# Construir la aplicación (Vite genera la carpeta "dist")
RUN npm run build

# Etapa 2: Servir con NGINX (ligero y rápido)
FROM nginx:1.27-alpine AS production

# Eliminamos archivos innecesarios del contenedor
RUN rm -rf /usr/share/nginx/html/*

# Copiamos los archivos generados del build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos un archivo nginx.conf custom (te lo muestro más abajo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]