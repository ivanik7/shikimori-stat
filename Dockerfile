FROM node:12.5-alpine

WORKDIR /app

RUN apk add --no-cache build-base jpeg-dev python g++ cairo-dev pango-dev

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run test; npm run build

EXPOSE 8080
CMD [ "node", "dist" ]
