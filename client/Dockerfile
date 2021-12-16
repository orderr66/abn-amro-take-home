FROM node:lts-alpine as build-stage
WORKDIR /usr/app
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# production stage
FROM node:lts-alpine
RUN npm install -g http-server
COPY --from=build-stage /usr/app/dist ./dist/
EXPOSE 8080
CMD [ "http-server", "dist" ]