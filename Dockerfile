FROM node:lts-alpine

WORKDIR /app

COPY package*.json .


RUN npm install --omit=dev


COPY . .

ENV API_PORT=3000

EXPOSE $API_PORT

CMD ["node", "server.js"]