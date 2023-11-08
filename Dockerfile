FROM node:18-alpine
LABEL org.opencontainers.image.source https://github.com/hepiska/wagptplus

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


CMD [ "node", "./dist/index.js" ]

# ini comment