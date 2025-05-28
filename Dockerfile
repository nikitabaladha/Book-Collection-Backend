# 1. Use official Node.js image
FROM node:22

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy your backend code
COPY . .

# COPY .env .env

# 6. Expose the backend port
EXPOSE 3001

# 7. Install PM2 globally and start app

CMD ["node", "server.js"]
