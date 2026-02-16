# Stage 1: Build the Next.js app and export static files
FROM node:20.10-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the project
COPY . .

ARG NEXT_PUBLIC_LOTTERY_HOME_URL
ARG NEXT_PUBLIC_LOTTERY_PLAY_URL
ARG NEXT_PUBLIC_LOTTERY_ROUND_HISTORY_URL
ARG NEXT_PUBLIC_ON_CHAIN_URL

ENV NEXT_PUBLIC_LOTTERY_HOME_URL=BAKED_NEXT_PUBLIC_LOTTERY_HOME_URL
ENV NEXT_PUBLIC_LOTTERY_PLAY_URL=BAKED_NEXT_PUBLIC_LOTTERY_PLAY_URL
ENV NEXT_PUBLIC_LOTTERY_ROUND_HISTORY_URL=BAKED_NEXT_PUBLIC_LOTTERY_ROUND_HISTORY_URL
ENV NEXT_PUBLIC_ON_CHAIN_URL=BAKED_NEXT_PUBLIC_ON_CHAIN_URL

# Build and export static files
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy static export from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Copy scripts and nginx configuration
COPY scripts ./scripts
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set default command
CMD ["sh", "./scripts/start.sh"]
