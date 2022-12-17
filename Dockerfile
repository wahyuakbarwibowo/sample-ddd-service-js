FROM node:18.12.1-bullseye-slim

ENV NODE_ENV=production

# Set Working Directory
WORKDIR /app

#Create PM2 Directory and Fix Permission
RUN mkdir /.pm2
RUN chmod -R 775 /.pm2

# Copy Node Packages Requirement
COPY package.json ./

# Install Node Modules Based on Node Packages Requirement
RUN npm i -g npm@8 pm2
RUN npm i --production

# Copy Node Source Code File
COPY . .

# Expose Apllication Port 9000
EXPOSE 9000

# Run the Application
CMD ["pm2-runtime", "index.js"];
