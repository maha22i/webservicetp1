FROM node:16-alpine 

WORKDIR /usr/src/app

COPY . .
RUN npm ci


RUN ./node_modules/.bin/nx run  api-match:build

CMD [ "node", "./dist/apps/api-match/main.js" ]