FROM node:16-alpine as app_backend
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]
#  ...
