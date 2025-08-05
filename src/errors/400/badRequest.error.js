/**
 * Custom error class representing a 400 Bad Request error.
 * Used when client sends invalid data or violates constraints.
 * 
 * @class BadRequestError
 * @extends {Error}
 * @property {string} name - The name of the error, set to 'BadRequestError'.
 * @property {number} statusCode - The HTTP status code for Bad Request, set to 400.
 * @param {string} message - A descriptive message for the error.
 */
class BadRequestError extends Error {
    /**
     * Create a new BadRequestError.
     * @param {string} message - Description of the error.
     */
    constructor(message) {
        super(message);

        // Set the error name explicitly for clarity in logs
        this.name = 'BadRequestError';

        // HTTP status code for Bad Request
        this.statusCode = 400;

        // Maintains proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequestError);
        }
    }
}

export default BadRequestError;
