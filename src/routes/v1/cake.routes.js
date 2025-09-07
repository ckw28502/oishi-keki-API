import express from 'express';
import cakeController from '../../controllers/cake.controller.js';
import { authenticateAccessToken } from '../../middlewares/jwtHandler.js';
import { authenticateOwner } from '../../middlewares/roleHandler.js';

const apiV1CakeRouter = express.Router();

/**
 * @swagger
 * /api/v1/cakes/{id}:
 *   get:
 *     summary: Get a cake by ID
 *     tags:
 *       - Cakes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the cake to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: cake data
 *       400:
 *        description: Invalid ID or request
 *       401:
 *        description: Unauthorized, missing or invalid token
 *       500:
 *        description: Internal server error
 */
apiV1CakeRouter.get("/:id", authenticateAccessToken, cakeController.getCakeById);

/**
 * @swagger
 * /api/v1/cakes:
 *   get:
 *     summary: Get paginated list of cakes
 *     tags:
 *       - Cakes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of items per page
 *       - in: query
 *         name: nameFilter
 *         schema:
 *           type: string
 *           default: ""
 *         description: Filter cakes by name
 *       - in: query
 *         name: sort
 *         required: true
 *         schema:
 *           type: string
 *           enum: [name_asc, name_desc, price_asc, price_desc]
 *         description: Sort by field
 *     responses:
 *       200:
 *         description: List of cakes with pagination
 */
apiV1CakeRouter.get("/", authenticateAccessToken, cakeController.getCakes);

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

/**
 * @swagger
 * /api/v1/cakes/{id}:
 *   put:
 *     summary: Update a cake by ID
 *     tags: [Cakes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the cake
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Chocolate Cake"
 *               price:
 *                 type: number
 *                 example: 150000
 *     responses:
 *       204:
 *         description: Cake updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       403:
 *         description: Forbidden, user is not the owner
 *       500:
 *         description: Internal Server error
 */
apiV1CakeRouter.put("/:id", authenticateAccessToken, authenticateOwner, cakeController.editCake);

/**
 * @swagger
 * /api/v1/cakes/{id}:
 *   delete:
 *     summary: Delete a cake by ID
 *     description: Deletes a specific cake. Only the owner can perform this action.
 *     tags:
 *       - Cakes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the cake to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Cake successfully deleted
 *       400:
 *         description: Invalid ID or request
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       403:
 *         description: Forbidden, user is not the owner
 *       500:
 *         description: Internal server error
 */
apiV1CakeRouter.delete("/:id", authenticateAccessToken, authenticateOwner, cakeController.deleteCake);

export default apiV1CakeRouter;
