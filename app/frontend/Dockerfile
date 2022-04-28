FROM node:16-alpine as app_frontend
WORKDIR /app/frotnend
COPY package*.json ./
RUN npm install
COPY . ./
CMD ["NPM", "install"]

#  ...
