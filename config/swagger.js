import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import packageInfo from '../package.json' with { type: 'json' };


/**
 * Setup Swagger UI for API documentation.
 * Configures and serves Swagger UI at the '/docs' endpoint.
 * 
 * @param {import('express').Application} app - The Express application instance
 */
export const setupSwagger = (app) => {
  // Swagger configuration options
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0", // OpenAPI specification version
      info: {
        title: "Oishi Keki API",  // API title
        version: packageInfo.version, // API version
        description: "API documentation for the Oishi Keki backend", // Description
      },
      servers: [
        {
          url: "http://localhost:3000", // Base URL of the API server for development
        },
      ],
    },
    // Path to files containing OpenAPI annotations (update to your routes path)
    apis: ["./routes/**/*.routes.js"],
  };

  // Generate Swagger specification using swagger-jsdoc
  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  // Setup Swagger UI middleware to serve docs at '/docs'
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}