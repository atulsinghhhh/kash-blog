FROM node:20

WORKDIR /myapp

COPY . .
RUN npm install

EXPOSE 8800

CMD [ "npm", "run", "start" ]