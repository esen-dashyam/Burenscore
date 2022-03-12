FROM node:12 AS builder
RUN apt-get update \
    && apt-get install -qq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    
WORKDIR /usr/src/app

COPY ./package* ./
COPY .npmrc .npmrc  
COPY package.json package.json  

RUN npm install
RUN rm -f .npmrc
COPY . .
RUN npm run build

# FROM redis
# # COPY redis.conf /usr/local/etc/redis/redis.conf
# CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]

FROM node:12
RUN apt-get update \
    && apt-get install -qq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    
WORKDIR /usr/src/app

COPY ./package* ./
COPY .npmrc .npmrc  
RUN npm install --production
RUN rm -f .npmrc
COPY --from=builder /usr/src/app/build ./build
CMD npm run production