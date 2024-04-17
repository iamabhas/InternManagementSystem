FROM node:alpine

WORKDIR /server

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install

COPY . .

CMD ["npm","run","start:dev"]