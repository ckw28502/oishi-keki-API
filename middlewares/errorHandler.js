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
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: err.message || 'Internal Server Error',
        }
    });
};

export default errorHandler;
