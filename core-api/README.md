This project was bootstrapped from express rest nodejs boilerplates.

## Initialisation

- create a `.env` file in `bug-manager/core-api/` which you should have these environment variables

```.env
NODE_ENV=development
PORT=3030
JWT_SECRET=[... create your own JWT secret]
JWT_EXPIRATION_MINUTES=15
MONGO_URI=[... connect to your local db or ask me @Safiy for help ...]
MONGO_URI_TESTS=[... connect to your local db or ask me @Safiy for help ...]
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the tests

### `npm lint`

Launches the linter checking on all the project

### `npm coverage`

Launches the tests with converage reports
