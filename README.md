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


### Thoughts on the approach

#### CSS structure

In Interlude I am trying out a styling approach with two main principles:

1. "Inherent" visual properties of a component are styled in a separate CSS module file.
2. Positioning is handled in component markup via CSS-in-JS (so far, with raw `style` attributes).

My thought is this combines the best parts of two reasonable patterns. CSS Modules give us clean separation of concerns and semantic classnames, whereas CSS-in-JS gives us styling information directly alongside the the component structure.

However, I think that a component's _positioning_ is the part that really benefits from the context of the HTML structure, so my thought is maybe it's natural to have `margin` and `padding` in the component markup. Then heavy presentational CSS lives outside the component code, keeping our components light, and we have plain old classes as the way to re-use styling.

In the past, I've disliked when all styling information for a given element is not present in one spot, so I'm curious to see if this approach causes problems or feels nice.

#### UI component library

Interlude's UI elements are built on top of Material UI's [Base UI](https://mui.com/base-ui/getting-started) library.

This isn't necessarily the direction I would go on a professional project with a bigger team. But one of my goals here is to spend more time with UI details than I probably would in a B2B SaaS (dayjob) setting. Base UI gives me a good platform to get my hands dirty without the overhead of implementing things like an autocomplete or modal from scratch. Plus it has good [a11y](https://mui.com/base-ui/getting-started/accessibility) support built in from the start.

I'm styling the components via Material's built-in CSS classes. I don't mind Material's JS-based styling patterns but I want to try and be as lightweight on the third-party tooling as possible and Emotion does bring a bit of baggage along with it. I'll be interested to see how much I miss theme-aware styling with the `sx` prop.
