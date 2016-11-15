FROM node:6.9

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Clean node modules directory so we have a fresh install (prevents conflicting os packages)
RUN rm -rf /usr/src/app/node_modules

# Install packages
RUN npm install

# Build
RUN npm run production

# Start nodejs
EXPOSE 8080
CMD [ "npm", "start" ]