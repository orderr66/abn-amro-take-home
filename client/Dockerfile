#STAGE1
FROM node:lts-alpine as builder
RUN npm install -g http-server
WORKDIR usr/app
COPY client/package*.json ./
RUN npm install
COPY . .
RUN npm run build
WORKDIR /usr/app/dist
EXPOSE 8080
CMD [ "http-server", "dist" ]