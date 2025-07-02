import express from 'express';
import { setupMiddlewares } from './config/middleware.js';
import { setupSwagger } from './config/Swagger.js';
import env from './config/env.js';

const app = express();

// Determine current environment mode, default to 'dev' if not set
const NODE_ENV = env.NODE_ENV;

// Setup middlewares like CORS, JSON parsing, Helmet, etc.
setupMiddlewares(app);

if (NODE_ENV === "dev") {
  // Setup Swagger UI for API documentation in development mode
  setupSwagger(app);
}

// Use PORT from environment variables, default to 3000 if not specified
const PORT = env.PORT;

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for testing or further use
export default app;
