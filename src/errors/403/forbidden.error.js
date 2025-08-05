/**
 * Custom error class representing a 403 Forbidden error.
 * Used when the client is authenticated but not authorized to perform the action.
 * 
 * @class ForbiddenError
 * @extends {Error}
 * 
 * @property {string} name - The name of the error, set to 'ForbiddenError'.
 * @property {number} statusCode - The HTTP status code for Forbidden, set to 403.
 */
class ForbiddenError extends Error {
    /**
     * Create a new ForbiddenError.
     * 
     * @param {string} message - Description of the error.
     */
    constructor(message) {
        super(message);

        // Set the error name explicitly for clarity in logs
        this.name = 'ForbiddenError';

        // HTTP status code for Forbidden
        this.statusCode = 403;

        // Maintains proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ForbiddenError);
        }
    }
}

export default ForbiddenError;
