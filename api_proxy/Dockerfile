FROM node:slim
MAINTAINER Dan
COPY . /data/
WORKDIR /data
RUN npm install
EXPOSE 5002
CMD [ "npm", "start", "NODE_ENV=production" ]