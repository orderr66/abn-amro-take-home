# Build stage 1.
# Builds TypeScript and produces an intermediate Docker image containing the compiled JavaScript code.
FROM node:lts-alpine as builder
WORKDIR /usr/app
COPY server/package*.json ./
COPY server/tsconfig.json ./
RUN npm install
COPY server/src ./src
RUN npm run build

# Build stage 2.
# Pulls the compiled code from the stage 1.
# Builds the final Docker image for production.
FROM node:lts-alpine
WORKDIR /usr/app
COPY server/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/app/dist ./dist/
WORKDIR ./dist
ENV NODE_PATH .
EXPOSE 4000
RUN ls -l
CMD ["node","app.js"]
