FROM node:8.3.0
MAINTAINER James Angus <james@ejangi.com>

WORKDIR /usr/src/app
VOLUME /usr/src/app
EXPOSE 3000
EXPOSE 3001

COPY package.json /usr/src/app/
COPY bower.json /usr/src/app/
COPY .bowerrc /usr/src/app/

RUN npm install && \
    npm install -g bower gulp && \
    bower install

ENTRYPOINT ["gulp", "watch"]