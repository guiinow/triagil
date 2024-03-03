# Use a base image of Node.js
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json, pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install project dependencies
RUN pnpm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port your application runs on
EXPOSE 3000

# Command to start the application when the container is run
CMD ["pnpm", "run", "start"]