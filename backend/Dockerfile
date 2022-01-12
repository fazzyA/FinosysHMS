FROM node:alpine

WORKDIR /dept1

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5006

CMD [ "npm", "start" ]