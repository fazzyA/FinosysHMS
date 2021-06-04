FROM node:alpine

WORKDIR /rad

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5005

CMD [ "npm", "start" ]