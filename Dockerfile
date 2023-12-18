# Use the official Node.js image as a base image
FROM node:14

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port your app will run on
EXPOSE 9000

# Set environment variable for production
ENV NODE_ENV=production

# Start your application
CMD ["node", "index.js"]
