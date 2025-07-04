/**
 * Utility to throw a custom error with HTTP status code and message.
 *
 * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
 * @param {string} message - Error message to send in the response
 * @throws {Error} - Custom error with status property
 */
export const createError = (statusCode, message) => {
    const error = new Error(message);
    error.status = statusCode;
    return error;
}