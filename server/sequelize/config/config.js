require("dotenv/config");

const { DATABASE_USER, DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD } =
  process.env;

module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
  test: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: "postgres",
  },
  production: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // disable certificate validation in production if required
      },
    },
  },
};
