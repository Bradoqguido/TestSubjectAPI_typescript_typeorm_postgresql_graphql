# About TestSubject API

This API is a way to learn how to use and improve my knowledge about many things like:
- RestAPIs;
- GraphQL;
- PostgreSQL;
- Typescript;
- TypeORM;
- Express;
- Middlewares;

# How to Use
To use this API, first you need to run `npm install` to install all the dependencies.

And change the parameters from `ormconfig.ts` at `src\ormconfig.ts`.

## Configure your .env file
Your .env file needs to be like these one above:

PS: Change the `censured` values to yours and other values too.

``` env
# Aplication
APP_PORT=3001
APP_SECRET=censured
APP_API_KEY=censured
APP_CRIPT_KEY=censured

# Database
DB_NAME=censured
DB_HOST=censured
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=censured
```

## Running the application

Just type `npm run dev` in your console to run the API in development mode.

Type `npm run start` in your console to run the API in production mode.

## Insert some data to test

To insert some data to test you can run the scripts of the `insertDataIntoDatabase.sql` file.

# More info
See [TypeORM Entities](https://typeorm.io/entities) to understand more about the called entities on models.