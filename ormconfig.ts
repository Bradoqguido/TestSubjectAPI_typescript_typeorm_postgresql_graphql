module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgresql",
    database: "postgres",
    synchronize: true,
    logger: "advanced-console",
    logging: "all",
    cache: true,
    dropSchema: false,
    entities: ["src/models/*.ts"],
  };