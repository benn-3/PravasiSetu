# Build Frontend
FROM node:18-alpine as client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Build Backend
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install
COPY server/ ./

# Copy frontend build to backend static (optional, or rely on Nginx)
# For this setup, we will run Backend and Frontend separately or serve static files
# Let's assume this Dockerfile is for the backend + serving frontend static files via Express
# OR we use Nginx to serve frontend.
# Given nginx.conf is requested, we likely want:
# 1. Nginx serving Frontend
# 2. Node serving Backend
# This single Dockerfile might be for the whole app or just one part. 
# I will create a Dockerfile for the SERVER.

EXPOSE 5000
CMD ["npm", "start"]
