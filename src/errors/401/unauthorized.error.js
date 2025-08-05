/**
 * Custom error class representing a 401 Unauthorized error.
 * Used when authentication fails or authorization is missing.
 * 
 * @class UnauthorizedError
 * @extends {Error}
 * 
 * @property {string} name - The name of the error, set to 'UnauthorizedError'.
 * @property {number} statusCode - The HTTP status code for Unauthorized, set to 401.
 */
class UnauthorizedError extends Error {
    /**
     * Create a new UnauthorizedError.
     * 
     * @param {string} message - Description of the error.
     */
    constructor(message) {
        super(message);

        // Set the error name explicitly for clarity in logs
        this.name = 'UnauthorizedError';

        // HTTP status code for Unauthorized
        this.statusCode = 401;

        // Maintains proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedError);
        }
    }
}

export default UnauthorizedError;
