# Account verification

This application takes a user through the account verification process using the Basiq API. It is built with three main technologies:

1. [Basiq API](https://api.basiq.io)
   Basiq is a Consumer Data Right accredited API platform that provides the building blocks of financial services.
2. [Next.js](https://github.com/vercel/next.js/)
   A framework for React that provides hybrid static & server rendering, TypeScript support, smart bundling, and route pre-fetching.
3. [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
   A utility-first CSS framework composed directly in your markup.

## Security model

All Basiq partner credentials (`BASIQ_API_KEY`) and the server-scoped access token (`SERVER_ACCESS`) are handled exclusively in Next.js API routes (`pages/api/`). They are never sent to the browser.

The browser only ever receives a short-lived, user-scoped `CLIENT_ACCESS` token minted on the server after the user is authenticated.

API routes that call the Basiq API on behalf of a user are protected by an HMAC-SHA256 signed HttpOnly session cookie (`av_session`). The cookie is issued when a user is created, and invalidated when the flow is cancelled or completed. The HMAC signature uses a `SESSION_SECRET` environment variable that must be set separately from the API key.

## Getting started

### 1. Use the template to create your own repository

Click the "Use this template" button on the main page of the repo to generate a new repository, then clone it:

```sh
git clone git@github.com:<your_username>/account-verification.git
cd account-verification
```

### 2. Environment setup

If you haven't already, [sign up](https://dashboard.basiq.io/login) to the Basiq API service and grab your API key for your application via the [Developer Dashboard](https://dashboard.basiq.io/).

Copy the sample environment file and fill in both values:

```sh
cp .env.sample .env.local
```

```diff
- BASIQ_API_KEY=
+ BASIQ_API_KEY=<your_basiq_api_key>

- SESSION_SECRET=
+ SESSION_SECRET=<random_64_hex_chars>
```

Generate a secure `SESSION_SECRET` with:

```sh
openssl rand -hex 32
```

> **Important:** `BASIQ_API_KEY` and `SESSION_SECRET` must be different values. Never commit `.env.local` — it is listed in `.gitignore`.

### 3. Install dependencies

```sh
yarn
```

### 4. Start the development server

```sh
yarn dev
```

The app will be running at `http://localhost:3000`.

## Testing

### Linting

This project uses `eslint` to enforce code quality. See the [Next.js ESLint guide](https://nextjs.org/docs/basic-features/eslint) for more information.

### End-to-End tests

[Cypress](https://github.com/cypress-io/cypress) is used for End-to-End testing. To run the tests, first start the dev server, then in a separate terminal:

```sh
yarn cypress
```

You can also run tests against the production build:

```sh
yarn build && yarn start
# then in another terminal:
yarn cypress
```

## Theming

This starter kit uses [Tailwind CSS](https://tailwindcss.com/docs/configuration) for all styling. Customise the theme in `tailwind.config.js` (colours, fonts) and `styles.css` (font imports, CSS variables).

### 1. Colours

All colours are defined in `tailwind.config.js` using a semantic naming convention (e.g. `primary-bold`, `neutral-muted`). Update them to match your brand.

### 2. Font

This starter kit uses the Inter font family.

1. Change the font `@import` in `styles.css`
2. Update `fontFamily` in `tailwind.config.js` to match

### 3. Product logos

Replace these SVG files using the same filenames:

- `product-full-logo.svg` — used on the home page
- `product-square-logo.svg` — used in the Account Verification form steps

The form layout works best with a square logo.

### 4. Product copywriting

Search for `PRODUCT-COPY` in the codebase to find every place that needs product-specific text. Read through all copy to ensure it matches the product you are building.

## Icons

All icons used in this starter kit are exported from [heroicons.com](https://heroicons.com/).

You can easily see which icon is which if you search the codebase for `Icon: `.