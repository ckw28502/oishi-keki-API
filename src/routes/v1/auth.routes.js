import express from 'express';
import authController from '../../controllers/auth.controller.js';
import { authenticateRefreshToken } from '../../middlewares/jwtHandler.js';

// Import the authentication routes for API version 1
const apiV1AuthRouter = express.Router();

/**
 * @swagger
 * /api/v1/auths/login:
 *   post:
 *     summary: Login for owner or employee
 *     tags:
 *      - Authentication
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
 *                 example: owner   
 *               password:
 *                 type: string
 *                 example: owner
 *     responses:
 *       200:
 *         description: Login successful, returns the tokens
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Internal server error
 */
apiV1AuthRouter.post("/login", authController.login);

/**
 * @swagger
 * /api/v1/auths/refresh:
 *   post:
 *     summary: Refresh tokens when access token is expired
 *     tags:
 *      - Authentication
 *     responses:
 *       200:
 *         description: Refresh tokens succesfull, returns the tokens
 *       401:
 *         description: Invalid or expired refresh token provided
 *       500:
 *         description: Internal server error
 */
apiV1AuthRouter.post("/refresh", authenticateRefreshToken ,authController.refreshTokens);

export default apiV1AuthRouter;
