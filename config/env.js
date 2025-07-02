import envalid from 'envalid';
import dotenv from 'dotenv';

// Load environment variables from .env file into process.env
dotenv.config();

// Destructure validators from envalid
const { str, port } = envalid;

// Validate and clean environment variables
// If any required variable is missing or invalid, this will throw an error and stop the app
const env = envalid.cleanEnv(process.env, {
    // PORT: the port number your Express app will listen on
    // Default to 3000 if not set
    PORT: port({ default: 3000 }),

    // NODE_ENV: the environment mode, must be one of 'dev', 'test', or 'prod'
    // No default, so it must be explicitly set
    NODE_ENV: str({ choices: ['dev', 'test', 'prod'] }),

    // APP_VERSION: version of your application
    // Required string, no default, good for tracking deployments
    APP_VERSION: str(),

    // PostgreSQL database username (required)
    POSTGRES_USER: str(),

    // PostgreSQL database password (required)
    POSTGRES_PASSWORD: str(),

    // PostgreSQL database name (required)
    POSTGRES_DB: str(),

    // PostgreSQL host address (required)
    POSTGRES_HOST: str(),

    // PostgreSQL port number with default of 5432
    POSTGRES_PORT: port({ default: 5432 }),
});

export default env;