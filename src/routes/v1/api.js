import express from 'express';

import apiV1AuthRouter from './auth.routes.js';
import apiV1CakeRouter from './cake.routes.js';

// Create a new router instance for API version 1
const apiV1Router = express.Router();

// Mount the authentication routes under /auth
apiV1Router.use('/auths', apiV1AuthRouter);

// Mount the cake routes under /cake
apiV1Router.use('/cakes', apiV1CakeRouter);

export default apiV1Router;