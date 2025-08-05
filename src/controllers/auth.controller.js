import { loginSchema } from "../validations/auth.validation.js";
import authService from "../services/auth.service.js";

/**
 * Controller for handling user login requests.
 * Validates the request body and calls the authentication service.
 *
 * @param {import('express').Request} req - The request object containing user credentials.
 * @param {import('express').Response} res - The response object to send back the authentication token.
 * @param {import('express').NextFunction} next - The next middleware function in the stack.
 */
const login = async (req, res, next) => {
    try {
        // Validate the request body against the login schema
        const { username, password } = loginSchema.parse(req.body);

        // Import the authService to handle authentication logic
        const result = await authService.login(username, password);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};

/**
 * Refreshes the access and refresh tokens using the payload extracted from the existing refresh token.
 *
 * @param {import('express').Request} req - Express request object (should contain `payload` from verified refresh token).
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function for error handling.
 *
 */
const refreshTokens = async (req, res, next) => {
    try {
        // Call service to generate new tokens using payload from the current refresh token
        const result = authService.refreshTokens(req.payload);

        // Respond with 200 OK and the new tokens
        res.status(200).json(result);
    } catch (error) {
        // Pass any error to the global error handler
        next(error);
    }
};


export default { login, refreshTokens };