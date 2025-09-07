import express from 'express';
import { setupMiddlewares } from './src/config/middleware.js';
import { setupSwagger } from './src/config/swagger.js';
import env from './src/config/env.js';
import apiRouter from './src/routes/api.js';
import errorHandler from './src/middlewares/errorHandler.js';
import { createServer } from "http";
import { setupSocket } from './src/config/socket.js';

const app = express();

// Determine current environment mode, default to 'dev' if not set
const NODE_ENV = env.NODE_ENV;

// Setup middlewares like CORS, JSON parsing, Helmet, etc.
setupMiddlewares(app);

if (NODE_ENV === "dev") {
  // Setup Swagger UI for API documentation in development mode
  setupSwagger(app);
}

// Import the main API router
app.use('/api', apiRouter);

// Use the custom error handler middleware to handle errors globally
app.use(errorHandler);

// Create an HTTP server instance from the Express app
const httpServer = createServer(app);

// Initialize and attach Socket.IO to the HTTP server
setupSocket(httpServer);

// Start the Express server on the specified port
httpServer.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

// Export the app for testing or further use
export default app;
