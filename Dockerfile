# Divide building process into multiple steps to use Docker's caching mechanism
# Node Alpine images are relatively small in size
FROM node:20-alpine AS base 

### Dependencies ###
FROM base AS deps
RUN apk add --no-cache libc6-compat git

WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./
# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

### Builder ###
FROM base AS builder

WORKDIR /app

# Copy node_modules from deps stage to builder stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application code
COPY . .
# Build the application
RUN yarn build

### Production image runner ###
FROM base AS runner

# Set NODE_ENV to production
ENV NODE_ENV production

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Set correct permissions for nextjs user and don't run as root
RUN addgroup nodejs
RUN adduser -SDH nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
#Next.js' standalone mode bundles everything into an isolated bundle, 
# so we don't need to worry about copying any other folders.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

# Exposed port (for orchestrators and dynamic reverse proxies)
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run the nextjs app
CMD ["node", "server.js"]
