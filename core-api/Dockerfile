FROM node:12.14-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --silent
COPY . .
ENV PATH /usr/src/app/node_modules/.bin:$PATH
EXPOSE 4000
CMD npm start