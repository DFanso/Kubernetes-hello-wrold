# Use the official Node.js image
FROM node:20

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy local code to the container image
COPY . .

# Run the web service on container startup
CMD [ "node", "index.js" ]

# Expose port 3000 to the outside world
EXPOSE 3000
