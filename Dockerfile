# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Define default values
ARG NODE_ENV=production
ARG PORT=3000
ARG CACHE_TYPE=memory

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV HOST=0.0.0.0
ENV PORT=${PORT}
ENV CACHE_TYPE=${CACHE_TYPE}

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE ${PORT}

CMD ["node", "dist/server.js"]
