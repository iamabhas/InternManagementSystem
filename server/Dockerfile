FROM node:alpine



#Create a App Directory
WORKDIR /server



#Install App Dependencies
COPY ./package*.json ./


#Run npm install 

RUN npm install


#Bundle app source
COPY . .


#Expose The Port
EXPOSE 5000

CMD ["npm","run","start:dev"]

