import express from 'express';
import cakeController from '../../controllers/cake.controller.js';
import { authenticateAccessToken } from '../../middlewares/jwtHandler.js';
import { authenticateOwner } from '../../middlewares/roleHandler.js';

const apiV1CakeRouter = express.Router();

/**
 * @swagger
 * /api/v1/cakes:
 *   post:
 *     summary: Create a new cake
 *     description: Requires a valid access token and owner role authorization.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cakes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Chocolate Fudge
 *               price:
 *                 type: number
 *                 example: 25000
 *     responses:
 *       201:
 *         description: Cake successfully created
 *       400:
 *         description: Invalid input or duplicate cake name
 *       401:
 *         description: Unauthorized - Missing, malformed, or expired access token
 *       403:
 *         description: Forbidden - User does not have owner role
 *       500:
 *         description: Server error
 */
apiV1CakeRouter.post("/", authenticateAccessToken, authenticateOwner, cakeController.createCake);

export default apiV1CakeRouter;
