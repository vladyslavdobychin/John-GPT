# Use a Node.js base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and related files to leverage Docker layer caching
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application (if you are using Vite, adjust accordingly)
RUN npm run build

# Install a simple http server for serving static content
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Serve the static files
CMD ["serve", "-s", "build", "-l", "3000"]
