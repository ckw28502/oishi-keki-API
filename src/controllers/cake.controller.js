import cakeService from "../services/cake.service.js";
import { createCakeSchema } from "../validations/cake.validation.js";

/**
 * Controller for handling the creation of a new cake.
 *
 * Validates the request body, then delegates creation logic to the service layer.
 *
 * @param {import('express').Request} req - Express request object containing the cake data in the body.
 * @param {import('express').Response} res - Express response object used to send the status.
 * @param {import('express').NextFunction} next - Express next middleware function for error handling.
 */
const createCake = async (req, res, next) => {
    try {
        // Validate request body using Zod schema
        const { name, price } = createCakeSchema.parse(req.body);

        // Create the cake using the service layer
        await cakeService.createCake(name, price);

        // Respond with 201 Created
        res.sendStatus(201);
    } catch (error) {
        // Pass error to centralized error handler
        next(error);
    }
}

export default { createCake };
