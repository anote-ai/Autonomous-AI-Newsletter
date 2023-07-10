# Use a base image with Node.js installed
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY ../my-app/package*.json ./

# Install the dependencies
RUN npm install

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Install the Python dependencies
COPY python/requirements.txt .
RUN pip3 install -r requirements.txt

# Copy the server code
COPY . .

# Expose the port on which the server will listen
# EXPOSE 3001

# Set the NODE_ENV environment variable
ENV NODE_ENV=production

# Start the server
CMD [ "npm", "run", "start" ]
