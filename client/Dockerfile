FROM node:lts-alpine as build-stage
WORKDIR /usr/app
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /usr/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]