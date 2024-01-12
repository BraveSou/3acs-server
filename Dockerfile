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

# Copy the 'assets' folder from the root directory
COPY /assets /usr/src/app/assets

# Expose the port the app runs on
EXPOSE 80

# Run the application
CMD ["node", "index.js"]
