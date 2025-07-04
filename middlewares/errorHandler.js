import { BadRequestError } from '../errors/400/badRequest.error.js';

/**
 * Error handling middleware for Express.js applications.
 * This middleware captures errors thrown in the application and sends a structured JSON response.
 * It also logs the error to the console for debugging purposes.
 *
 * @param {Error} err - The error object thrown in the application.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function in the stack.
 */

const errorHandler = (err, req, res, next) => {
    let error;
    if (err.name === 'ZodError') {
        error = handleZodError(err);
    } else {
        error = err;
    }

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        error: error.message || 'Internal Server Error',
    });
}; 

/**
 * Converts a Zod validation error into a custom `BadRequestError` with a readable message.
 *
 * @param {import('zod').ZodError} err - The Zod error object thrown during schema validation.
 * @returns {BadRequestError} - A custom error containing concatenated error messages.
 */
const handleZodError = (err) => {
    const messages = err.issues
        .map(issue => issue.message)
        .join(', ');

    return new BadRequestError(messages);
};
export default errorHandler;
