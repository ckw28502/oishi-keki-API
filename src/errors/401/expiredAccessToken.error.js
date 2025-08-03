import UnauthorizedError from "./unauthorized.error.js";

/**
 * Custom error to represent an expired access token.
 * Extends UnauthorizedError with a fixed error message.
 *
 * @class ExpiredAccessTokenError
 * @extends {UnauthorizedError}
 *
 * @property {string} name - The name of the error, set to 'ExpiredAccessTokenError'.
 */
class ExpiredAccessTokenError extends UnauthorizedError {
    /**
     * Constructs a new ExpiredAccessTokenError with a predefined message.
     */
    constructor() {
        super("Access token has expired!");
        this.name = "ExpiredAccessTokenError";
    }
}

export default ExpiredAccessTokenError;
