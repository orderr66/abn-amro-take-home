FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR usr/app
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build
WORKDIR /usr/app/dist
EXPOSE 8000
CMD [ "http-server", "dist" ]