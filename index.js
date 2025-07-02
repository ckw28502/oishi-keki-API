import express from 'express';
import dotenv from 'dotenv';
import { setupMiddlewares } from './config/middleware.js';
import { setupSwagger } from './config/Swagger.js';

// Load environment variables from .env file into process.env
dotenv.config();

const app = express();

// Setup middlewares like CORS, JSON parsing, Helmet, etc.
setupMiddlewares(app);

// Setup Swagger UI documentation endpoint
setupSwagger(app);

// Use PORT from environment variables, default to 3000 if not specified
const PORT = process.env.PORT || 3000;

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for testing or further use
export default app;
