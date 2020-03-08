FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json yarn.lock ./
RUN yarn install

# Bundle app source
COPY . .

CMD [ "yarn", "build" ]
