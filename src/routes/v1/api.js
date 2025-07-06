import express from 'express';

import apiV1AuthRouter from './auth.routes.js';

// Create a new router instance for API version 1
const apiV1Router = express.Router();

// Mount the authentication routes under /auth
apiV1Router.use('/auth', apiV1AuthRouter);

export default apiV1Router;