import { loginSchema } from "../../validations/auth.validation.js";
import authService from "../../services/auth/auth.service.js";

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

export default { login };