An [Express](https://expressjs.com/) based REST API.

<hr />

## Setup

Required Environment Variables
```bash
# Example .env file
SNE_PORT=8080 # which port to run this app
SNE_DB_HOST=...
SNE_DB_PORT=5432 # default postgresql port
SNE_DB_USER=...
SNE_DB_PASSWORD=...
SNE_DB_DATABASE=...
```

```bash
# Install all the backend dependencies
npm install

# For local development
# Uses nodemon to restart the server on file changes
npm run dev
```
