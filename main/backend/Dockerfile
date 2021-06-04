FROM node:alpine

WORKDIR /be

COPY package.json ./

RUN npm install

COPY ./backend ./backend

EXPOSE 5004

CMD [ "npm", "start" ]