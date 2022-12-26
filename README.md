# interlude
An app for organizing music

### Development

You need a `.env.local` file with the Spotify client secret in it.
Next.js [automatically makes this available](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) at build time on `process.env`.

To run locally:

1. Make sure your Node version matches what's in `.node-version`... no promises otherwise
2. Install packages: `npm ci`
3. Run the dev server: `npm run dev`
