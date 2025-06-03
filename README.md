# Origin Energy - 🧪 Take Home Challenge

> Build a React + Node.js application that renders a customer's energy accounts
> and allows a user to make a credit card payment.

## Design decisions

I initially started with the schemas for the existing mocked data and worked
backwards from there for I would need. Since the task mentioned "Swagger
documentation" I knew using Zod (or similar type of runtime checker) could pair
well with OpenAPI schema creation.

From there generating the server API handler and client became easier since the
schema did a lot of the heavy lifting. Without the OpenAPI backend I would have
written something similar for the controller actions, injecting the "app" state
or context for access to the initialised services and repositories.

The Repositories call the mock APIs and store the values in memory at the
moment. This so it can pretend to be accessing a database that isn't there.
Otherwise calling them every request, like an external API micro-service, was
another approach, but because of the timeout delay I went for storing them in
memory instead.

Controllers were kept as module functions, but Services were classes. Initially
I didn't pass around the Repositories as part of the App context, but the
payments history only needed access to the repositories, so these Services could
be refactored to just be their functions with the context passed in as well.

Opted to use `react-query` and `react-hook-form` to avoid having to implement
fetch life-cycle reducer/state management and referencing the React form &
values, whilst tracking & updating them via an `onChange` event handler, just
seemed unncessary to redo again. Same for writing validators and rule callbacks
to generate errors.

- Payments are registered as negative due charge amounts. There could be a
  separate payments resource/repository if needed

- Credit cards are just dropped and not stored after validating them

- The due-charges/payment history data can be accessed by clicking the "Amount
  Due: $X.XX" text. No mockups or suggestions were provided so placed it there

## Example data

Use something like the following is needed for the Payment modal, since it does
have validation:

```
"4111111111111111" // cardNumber
"12/25" // expiryDate
"123" // cvv
```

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

- Better error handling & typing; e.g.

  ```
  type NotFound = { code: 404, message: string };
  type InternalServerError = { code: 500, message: string };

  type Error = NotFound | InternalServerError; // | ...
  ```

  Also, a possible better design for handling validation errors from the server

- Naming of thing could be better
