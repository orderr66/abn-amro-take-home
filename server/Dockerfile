# Build stage 1.
# Builds TypeScript and produces an intermediate Docker image containing the compiled JavaScript code.
FROM node:latest as builder
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./src ./src
COPY .env .
RUN npm run build

# Build stage 2.
# Pulls the compiled code from the stage 1.
# Builds the final Docker image for production.
FROM node:latest
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --only=production
RUN npm install pm2 -g
COPY --from=builder /usr/app/dist ./dist/
COPY --from=builder /usr/app/.env ./dist/
WORKDIR ./dist
ENV NODE_PATH .
EXPOSE 8080
CMD ["pm2-runtime","app.js"]
