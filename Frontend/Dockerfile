# Stage 1: Build the Vite app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn run build

# Stage 2: Serve the app with a static file server
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

COPY --from=builder /app/scripts .

# Command to start the serve HTTP server
CMD ["sh", "start.sh"]
