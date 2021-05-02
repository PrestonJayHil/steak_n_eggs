A [React]() based website supported by [Vite](https://vitejs.dev).

<hr />

## Setup

Required Environment Variables
```bash
# Example .env file
VITE_AUTH0_DOMAIN=...
VITE_AUTH0_CLIENT_ID=...
```

```bash
# Install all the client dependencies
npm install

# For local development
# Starts a localhost with hot reloading
npm run dev

# Build for production
# Apply optimizations and output files for hosting
npm run build
```

<hr />

## Features

```
Note that by default, Vite only handles syntax transforms and does not cover polyfills by default.
```
See: https://vitejs.dev/guide/build.html#browser-compatibility


### **CSS Nesting** - enabled by [postcss-nesting](https://github.com/csstools/postcss-nesting).

```pcss
a, b {
  color: red;

  & c, & d {
    color: white;
  }
}

/* becomes */

a, b {
  color: red;
}

a c, a d, b c, b d {
  color: white;
}
```