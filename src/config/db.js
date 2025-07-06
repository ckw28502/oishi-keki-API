import { Sequelize } from "sequelize";
import env from "./env.js";

// Create a new Sequelize instance to manage the PostgreSQL connection
// Pass database credentials and configuration from environment variables
const sequelize = new Sequelize(env.POSTGRES_DB, env.POSTGRES_USER, env.POSTGRES_PASSWORD, {
    host: env.POSTGRES_HOST,     // Database server hostname or IP address
    port: env.POSTGRES_PORT,     // Port on which the database listens (default 5432)
    dialect: 'postgres',         // Specify the SQL dialect for PostgreSQL
    logging: env.NODE_ENV === 'dev' ? console.log : false,  // Enable logging of SQL queries only in development environment for easier debugging
});

export default sequelize;
