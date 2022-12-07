FROM node:16-alpine
WORKDIR /app

RUN apk add --update --no-cache --virtual .build-dev git
RUN npm i -g npm pm2

COPY package.json ./

RUN npm i
RUN apk del .build-dev

COPY . .

ENV NODE_ENV=production

HEALTHCHECK CMD wget -qO- localhost:3000/hc

CMD ["pm2-runtime", "index.js"]
