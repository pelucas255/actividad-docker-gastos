# Imagen para la practica de Docker - IDSM41
FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY src.js ./
COPY test ./test

EXPOSE 3000

CMD ["node", "src.js"]
