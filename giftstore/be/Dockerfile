FROM node:alpine

WORKDIR /be

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5006

CMD [ "npm", "start" ]