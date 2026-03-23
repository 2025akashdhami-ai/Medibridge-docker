FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
RUN npm install -g @nestjs/cli
COPY . .
RUN nest build
EXPOSE 5000
CMD ["node", "dist/main.js"]