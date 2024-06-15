FROM node:20-alpine AS base
WORKDIR /app

RUN apk add --no-cache jpeg-dev cairo-dev pango-dev



FROM base AS install

RUN apk add --no-cache build-base python3 g++

COPY package*.json ./
RUN npm ci --only=production



FROM install AS build

RUN npm ci

COPY . .

RUN npm run test; npm run build



FROM base

COPY --from=install /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY ./fonts ./fonts

EXPOSE 8080
CMD [ "node", "dist" ]
