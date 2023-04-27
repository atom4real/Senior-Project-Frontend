# # build stage
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# # production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# Base image
# FROM node:16

# # Set working directory
# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the files
# COPY . .
# ENV PATH /app/node_modules/.bin:$PATH

# # Build the app
# RUN npm run build

# # Expose the app's port
# EXPOSE 3000

# # Start the app
# CMD ["npm", "run", "dev"]

# Use an official Node.js runtime as a parent image
FROM node:14.17.6-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Serve the application using the static web server serve
RUN npm install -g serve
CMD ["serve", "-s", "dist"]


