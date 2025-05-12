# Use an official Node.js runtime as a parent image (Alpine version for smaller size)
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) first
# This leverages Docker Caching. If these files haven't changed, Docker won't re-run npm install
COPY package*.json ./

# Install app dependencies
# Using npm ci for a clean, reproducible install from package-lock.json
# If you prefer, you can use npm install
RUN npm ci

# Bundle app source
COPY . .

# Build TypeScript to JavaScript
# This will create the /dist folder with the compiled JavaScript
RUN npm run build

# The application listens on port 3001 (or whatever is set in PORT env var)
EXPOSE 3001

# Define the command to run the application
# This will run the "start" script from package.json: "node dist/index.js"
CMD [ "npm", "start" ] 