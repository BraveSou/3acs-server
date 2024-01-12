# Use a smaller base image for Node.js, such as the 'alpine' version
FROM node:18.16.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the application code into the container
COPY . .


# Expose the port the app runs on - this is the port that will be exposed so that it can be accessed from the container
EXPOSE 80 

# Run the application - this are the ignition commands that help to start the server
CMD ["node", "index.js"]
