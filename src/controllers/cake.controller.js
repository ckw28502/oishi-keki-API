import cakeService from "../services/cake.service.js";
import { cakeIdParamSchema, createCakeSchema, editCakeSchema, getCakesSchema } from "../validations/cake.validation.js";

/**
 * Controller to handle the GET /cakes request with pagination, filtering, and sorting.
 *
 * It validates the query parameters using Zod schema, then calls the service layer
 * to get the list of cakes, and finally sends the JSON response with the results.
 *
 * @param {import('express').Request} req - Express request object, expects query parameters:
 *   - page: number (required, positive)
 *   - size: number (required, positive)
 *   - nameFilter: string (optional, defaults to empty string)
 *   - sortParam: string (required, one of "name" or "price")
 *   - isAscending: boolean (required)
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function for error handling
 */
const getCakes = async (req, res, next) => {
    try {
        // Validate and parse query parameters
        const reqQuery = await getCakesSchema.parseAsync(req.query);

        // Call service to fetch cakes data based on the validated query
        const result = await cakeService.getCakes(reqQuery);

        // Send successful JSON response with cake data
        res.status(200).json(result);
    } catch (error) {
        // Pass error to Express error handler middleware
        next(error);
    }
};


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
        const reqBody = await createCakeSchema.parseAsync(req.body);

        // Create the cake using the service layer
        await cakeService.createCake(reqBody);

        // Respond with 201 Created
        res.sendStatus(201);
    } catch (error) {
        // Pass error to centralized error handler
        next(error);
    }
}

/**
 * Controller for handling the editing of an existing cake.
 *
 * Validates the request body, then delegates creation logic to the service layer.
 *
 * @param {import('express').Request} req - Express request object containing the cake data in the body.
 * @param {import('express').Response} res - Express response object used to send the status.
 * @param {import('express').NextFunction} next - Express next middleware function for error handling.
 */
const editCake = async (req, res, next) => {
    try {
        const { id } = await cakeIdParamSchema.parseAsync(req.params);
        const reqBody = await editCakeSchema.parseAsync(req.body);
        await cakeService.editCake({ id, ...reqBody });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

export default { getCakes, createCake, editCake };
