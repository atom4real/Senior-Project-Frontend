# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the application
RUN npm cache clean --force
RUN run build -prod

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
