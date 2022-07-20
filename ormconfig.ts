require('dotenv/config');
module.exports = {
    type: "postgres",
    host: process.env.HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logger: "advanced-console",
    logging: "all",
    cache: true,
    dropSchema: false,
    entities: ["src/entities/*.ts"],
  };