import express from 'express';

import apiV1Router from './v1/api.js';

const apiRouter = express.Router();

/**
 * Main API router mounting all resource-specific routers under /api
 * This router will be mounted on /api in the main app
 */

// V1 routes
apiRouter.use('/v1', apiV1Router);

export default apiRouter;