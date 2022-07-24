# A ready to go stripe template

## Stack

- [TypeScript](https://www.typescriptlang.org/) - A strict syntactical superset of JavaScript and adds optional static typing to the language.
- [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
- [Node.js](https://nodejs.org/en/) - A back-end Javascript runtime environment to executes JavaScript code outside a web browser.
- [PostgreSQL](https://www.postgresql.org/) - A free and open-source relational database management system emphasizing extensibility and SQL compliance.
- [Redis](https://redis.io/) - An in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability.
- [GraphQL](https://graphql.org/) - An open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.
- [Stripe](https://stripe.com/) - A suite of APIs powering online payment processing and commerce solutions for internet businesses of all sizes.
- [Chakra UI](https://chakra-ui.com/) - A simple, modular and accessible component library for React.

## Config / Secrets environment variables

Copy `.env.example` from the server and client folders to `.env` and `.env.local` respectively and add your private information

*Note: never commit this file, it should be ignored by Git*

### client
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### server
```
DATABASE_URL=
REDIS_URL=
PORT=
SESSION_SECRET=
CORS_ORIGIN=
```

## Installation

```bash
https://github.com/theMillenniumFalcon/stripe-template
```

```bash
cd client
npm install
```

```bash
cd server
npm install
```

## Running the app

### For client
```bash
# development
npm run dev
```

### For server
```bash
# compiling with watch flag
npm run watch

# development
npm run dev
```

## Project Structure

### client

    .
    ├── ...
    ├── src                     # Source files
    │   ├── ...
    │   ├── components          # config files
    │   ├── constants           # controllers for database schemas
    │   ├── generated           # database connection file
    │   ├── graphql             # middleware functions
    │   ├── pages               # mongoDB models
    │   ├── public              # routers
    │   ├── styles              # utils
    |   ├── utils               # Starting point
    │   └── ...
    └── ...

### server

    .
    ├── ...
    ├── src                     # Source files
    │   ├── ...
    │   ├── config              # config files
    │   ├── controllers         # controllers for database schemas
    │   ├── db                  # database connection file
    │   ├── middleware          # middleware functions
    │   ├── models              # mongoDB models
    │   ├── routers             # routers
    │   ├── utils               # utils
    |   ├── index.js            # Starting point
    │   └── ...
    └── ...

### I have another question!

Feel free to ask me on [Twitter](https://twitter.com/nishankstwt)! You can also email me at nishankpr435@gmail.com.