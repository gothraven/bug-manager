## Initialisation

- create a `.env` file in `bug-manager/core-api/` which you should have these environment variables

```.env
NODE_ENV=development
PORT=3000
JWT_SECRET=[... create your own JWT secret ...]
JWT_EXPIRATION_MINUTES=15
MONGO_URI=[... connect to your local or online database ...] example: "mongodb://localhost/db"
MONGO_URI_TESTS=[... connect to your local or online test database ...] example: "mongodb://localhost/test"
```

## Available Scripts

In the project directory, you can run:

### `npm run populate:basic`

To build a basic database for the project to work initially.

### `npm run populate:full`

To build a full database for the project to work with some examples.

### `npm start`

Runs the app in the development mode.<br>
Open `http://localhost:{PORT}` to view graphql dev console in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Default users

if you don't want to create new user you can start with these when you run `npm run populate:full` or `npm run populate:basic`
```
Admin:
- email: admin@bug.co
- password: password

Developer:
- email: dev@bug.co
- password: password

User:
- email: user@bug.co
- password: password
```

## Documentation

You can find all the queries and mutations in the Graphql Dev console by running `npm start` and checking `http://localhost:{ENV_PORT}`, on the right side you will find a Schema and Doc pannels.
