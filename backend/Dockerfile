FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY . .
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY src/ ./src/


RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
