import express from 'express';
import { setupMiddlewares } from './src/config/middleware.js';
import { setupSwagger } from './src/config/swagger.js';
import env from './src/config/env.js';
import apiRouter from './src/routes/api.js';
import errorHandler from './src/middlewares/errorHandler.js';

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

// Import the main API router
app.use('/api', apiRouter);

// Use the custom error handler middleware to handle errors globally
app.use(errorHandler);

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for testing or further use
export default app;
