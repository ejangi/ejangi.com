FROM node:8
MAINTAINER James Angus <james@ejangi.com>

WORKDIR /usr/src/app
VOLUME /usr/src/app
EXPOSE 3000
EXPOSE 3001

COPY package.json /usr/src/app/

RUN rm -rf node_modules && \
    npm --force cache clean && \
    npm install

RUN npm install -g gulp-cli gulp && \
    npm install gulp-cli gulp -D && \
    npx -p touch nodetouch gulpfile.js

CMD ["gulp", "watch"]