import envalid from 'envalid';
import dotenv from 'dotenv';

// Load environment variables from .env file into process.env
dotenv.config();

// Destructure validators from envalid for convenience
const { str, port } = envalid;

// Validate and clean environment variables to ensure required config is present and correctly typed
// If validation fails, the app will throw an error and stop
const env = envalid.cleanEnv(process.env, {
    // PORT: Port number for the Express server to listen on (default: 3000)
    PORT: port({ default: 3000 }),

    // NODE_ENV: Application environment mode, must be one of 'dev', 'test', or 'prod'
    NODE_ENV: str({ choices: ['dev', 'test', 'prod'] }),

    // PostgreSQL database connection details
    POSTGRES_USER: str(),       // Database username
    POSTGRES_PASSWORD: str(),   // Database password
    POSTGRES_DB: str(),         // Database name
    POSTGRES_HOST: str(),       // Database host address
    POSTGRES_PORT: port({ default: 5432 }),  // Database port number (default: 5432)

    // Cloudinary configuration for media storage (image uploads)
    CLOUDINARY_CLOUD_NAME: str(), // Cloudinary cloud name
    CLOUDINARY_API_KEY: str(),    // Cloudinary API key
    CLOUDINARY_API_SECRET: str(),  // Cloudinary API secret

    // Owner credentials for admin access
    OWNER_USER: str(),
    OWNER_PASSWORD: str(),

    // Employee credentials for staff access
    EMPLOYEE_USER: str(),
    EMPLOYEE_PASSWORD: str(),

    // JWT secret for signing tokens, must be a strong secret
    JWT_ACCESS_TOKEN_SECRET: str(),
    JWT_REFRESH_TOKEN_SECRET: str()
});

export default env;
