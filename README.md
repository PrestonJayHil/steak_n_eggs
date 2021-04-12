This repo hosts the code for the Steak N Eggs website

The project is split in two directories
* ***client*** - Houses the web application that interfaces with the backend code running elsewhere.
* ***backend*** - Houses the code for the API and database.

<hr />

## Setup

Ensure npm is available ([Installation instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

Clone the repo:  
```bash
git clone https://github.com/PrestonJayHil/steak_n_eggs.git .
cd steak_n_eggs
```

### 1. backend  
**Ensure you have a .env file located in the root of the backend directory**

```bash
# Sample .env
SNE_PORT=...
SNE_DB_HOST=...
SNE_DB_PORT=...
SNE_DB_USER=...
SNE_DB_PASSWORD=...
SNE_DB_DATABASE=...
```

```bash
cd backend

# Install all the backend dependencies
npm install

# For local development
# This will the start the app at localhost:SNE_PORT
npm run dev
```

### 2. client  
```bash
cd client
# Install all the client dependencies
npm install

# For local development
# Starts a localhost with hot reloading
npm run dev

# Build for production
# Apply optimizations and output files for hosting
npm run build
```
