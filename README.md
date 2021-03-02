This repo hosts the code for the Steak N Eggs website

The project is split in two directories (Only one exists right now)
* ***client*** - Houses the web application that interfaces with the backend code running elsewhere.
* ~~*backend* - Houses the code for the API and database.~~

## Setup

1. backend
This will describe setting up the database and API for use by the frontend.
Currently there is no database/API so setup only involves the client.

2. client
```bash
cd client
npm install

# For local development
# Starts a localhost with hot reloading
npm run dev

# Build for production
# Apply optimizations and output files for hosting
npm run build
```