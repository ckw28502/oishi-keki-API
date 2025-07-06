import express from 'express';
import authController from '../../controllers/auth.controller.js';

// Import the authentication routes for API version 1
const apiV1AuthRouter = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login for owner or employee
 *     tags: [V1 Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns a token
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Internal server error
 */
apiV1AuthRouter.post("/login", authController.login);

export default apiV1AuthRouter;
