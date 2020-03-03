# Use the official image as a parent image
FROM node:current-slim

# Set the working directory
WORKDIR /usr/src/concise-family

# Copy the file from your host to your current location
COPY package.json .

# Run the command inside your image filesystem
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 4000

# Run the specified command within the container.
CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY public .