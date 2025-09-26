# Environment variable configuration for Coolify

## Build-time variables
# These should be set to "Runtime only" in Coolify environment settings
NODE_ENV=development

## Runtime variables
# These can be available at both build and runtime
NEXT_PUBLIC_SERVER_URL=https://your-app-domain.com
MONGODB_URI=mongodb+srv://username:password@your-mongodb-url/your-db-name
PAYLOAD_SECRET=your-secure-random-string
PAYLOAD_CONFIG_PATH=dist/payload.config.js