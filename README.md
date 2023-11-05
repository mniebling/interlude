# interlude

An app for organizing music

[![Netlify Status](https://api.netlify.com/api/v1/badges/4cebcf50-eb5b-4838-b867-75bbb7e9f87b/deploy-status)](https://app.netlify.com/sites/interlude-music/deploys)

### Development

You need a `.env.local` file with the Spotify client secret in it.
Netlify [automatically makes this available](https://docs.netlify.com/configure-builds/environment-variables) at build time on `process.env`.

To run locally:

1. Make sure your Node version matches what's in `.node-version`... no promises otherwise
2. Install packages: `npm ci`
3. Run the dev server: `npm start`

Netlify's CLI will serve the edge functions in `/api` in development mode.
