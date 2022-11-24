FROM node:10.16.3-stretch as build
MAINTAINER Dan
COPY . /data/
WORKDIR /data
ARG VUE_APP_API
RUN npm install && npm run build

FROM nginx:stable
COPY --from=build /data/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]