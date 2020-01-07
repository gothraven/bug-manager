FROM node:12.14-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --silent
COPY . ./
ENV PATH /usr/src/app/node_modules/.bin:$PATH
EXPOSE 3000
CMD npm start