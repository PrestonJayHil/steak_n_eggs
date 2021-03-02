A [React]() based website supported by [Vite](https://vitejs.dev).

## Setup

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

## Features

```
Note that by default, Vite only handles syntax transforms and does not cover polyfills by default.
```
See: https://vitejs.dev/guide/build.html#browser-compatibility


**CSS Nesting** - enabled by [postcss-nesting](https://github.com/csstools/postcss-nesting).

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