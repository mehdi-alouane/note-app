# Build stage
FROM node:22-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:22-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app/dist /app/dist
COPY package*.json ./

RUN npm install --only=production

# Install serve to run the application
RUN npm install -g serve

EXPOSE 8000

CMD ["serve", "-s", "dist", "-l", "8000"]