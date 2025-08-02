import express from 'express';
import cakeController from '../../controllers/cake.controller.js';

const apiV1CakeRouter = express.Router();

/**
 * @swagger
 * /api/v1/cakes:
 *   post:
 *     summary: Create a new cake
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
 *       500:
 *         description: Server error
 */
apiV1CakeRouter.post("/", cakeController.createCake);

export default apiV1CakeRouter;
