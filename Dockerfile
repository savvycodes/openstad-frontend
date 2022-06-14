# Nodejs 8.0.0 alpine 3.6.0
FROM node:13.14.0-alpine

# Label for tracking
LABEL nl.openstad.container="frontend" nl.openstad.version="0.0.1-beta" nl.openstad.release-date="2020-05-07"

# Frontend container name
ENV DEFAULT_HOST="" \
    # frontend url + port `example.com:port`
    HOST_DOMAIN="" \
    # full url `http://example.com:port`
    APP_URL="" \
    PORT="4444" \
    # `AUTH_FIXED_TOKEN` for auth container
    SITE_API_KEY="" \
    # Full api address `http://example.com:port`
    API="" \
    # MongoDB credentials
    MONGO_DB_HOST="" \
    DB_HOST="" \
    DEFAULT_DB="" \
    APOS_BUNDLE="assets" \
    NODE_ENV="production" \
    S3_ENDPOINT="" \
    S3_KEY="" \
    S3_SECRET="" \
    S3_BUCKET=""

# Install all base dependencies.
RUN apk add --no-cache --update openssl g++ make python musl-dev git bash

# Set the working directory to the root of the container
WORKDIR /home/app

#RUN cp -r ./packages/cms/test test
RUN mkdir -p /home/app/public \
    && mkdir -p /home/app/public \
    && mkdir -p /home/app/public/modules \
    && mkdir -p /home/app/public/css \
    && mkdir -p /home/app/public/js \
    && mkdir -p /home/app/public/img \
    && mkdir -p /home/app/public/apos-minified \
    && mkdir -p /home/app/data \
    && mkdir -p /home/app/public/uploads/assets \
    && mkdir ~/.ssh ; echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

# Bundle app source
COPY --chown=node:node . /home/app

# Install node modules
RUN npm install --loglevel warn --production \
    # Remove unused packages only used for building.
    && apk del openssl g++ make python && rm -rf /var/cache/apk/*

# Mount persistent storage
#VOLUME /home/app/data
VOLUME /home/app/public/uploads

# Set node ownership to/home/app
# only run CHOWN on dirs just created
# the copy command created the proper rights
# otherwise takes very long
RUN chown -R node:node /home/app/public \
    && chown -R node:node /home/app/data

USER node

# Exposed ports for application
EXPOSE 4444/tcp
EXPOSE 4444/udp

# Run the application
CMD [ "npm", "start" ]
