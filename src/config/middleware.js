import helmet from 'helmet';
import express from 'express';


/**
 * Setup middleware for the Express app.
 * Applies security, CORS, and JSON parsing middleware,
 * and disables the 'X-Powered-By' header for security reasons.
 * 
 * @param {import('express').Application} app - The Express application instance
 */
export const setupMiddlewares = (app) => {
  // Parse incoming request bodies in JSON format
  app.use(express.json());

  // Use Helmet to secure HTTP headers to protect from common vulnerabilities
  app.use(helmet());

  // Disable the 'X-Powered-By' header to prevent revealing the use of Express
  app.disable('x-powered-by');
}