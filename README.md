# Origin Energy - 🧪 Take Home Challenge

> Build a React + Node.js application that renders a customer's energy accounts
> and allows a user to make a credit card payment.

## Package - NPM Scripts

_You will need to run `npm install` to install dependencies before running the
app. This assumes you have Node.js installed and setup in your PATH_

- `npm start`/`npm run start`

  Starts the compiled app server (need to run `npm run build` before this
  script)

- `npm run build`

  Builds both the server and frontend apps

- `npm run test`

  Run Jest test suite

- `npm run test:cypress`/`npm run test:cypress-gui`

  Run separate Cypress tests, in headless or GUI modes respectively.

  You will need to navigate to the `./integration` directory first to install
  Cypress dependency first (it's separate to the main app).

- `npm run lint`

  Runs ESLint rules + TypeScript type checking

- `npm run format`

  Formats the app using Prettier

- `npm run generate-types`

  This generates the OpenAPI types from the backend for use within the React
  app. Server must be running first.

  + OpenAPI schema can be accessed http://localhost:8080/openapi.json
  + Swagger web UI can be accessed http://localhost:8080/docs

## TODOs:

- Finish building out the Design System and rip out the PaperCSS dependency. I
  would look at either writing my own stylesheets, CSS-in-JS (like
  styled-components) or maybe try something like Tailwind

- I lost an embrassing amount of time to just fixing the build tools. Not happy
  with the current Vite solution and use Parcel or might reassess just using
  Babel with Webpack 😕

- Add a `/?reset` path to the server to make re-running the Cypress tests, but
  requires locking down

- Improve tests overall:

  + There are date/time validations not mocked out
  + Add a `mockRequest` & `mockResponse` object since adding `any` causes the
    linter to complain and I want to keep that linting rule

- Might separate the `client` & `server` code more, but the majority of the
  server code is living in the `./src/api` directory so 🤷

- Maybe fix the React Query SSR, didn't work for some reason, so I ended up
  ripping it out
