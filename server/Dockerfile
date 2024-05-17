FROM node:18.16.0-alpine3.17

#Create a App Directory
WORKDIR /server

#Install App Dependencies
COPY ./package*.json ./

#Run npm install
RUN npm install

#Bundle app source
COPY . .

#Expose The Port
EXPOSE 5001


CMD ["npm","run","start:dev"]
