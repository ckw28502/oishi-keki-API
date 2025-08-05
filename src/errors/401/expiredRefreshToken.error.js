import UnauthorizedError from "./unauthorized.error.js";

/**
 * Custom error to represent an expired refresh token.
 * Extends UnauthorizedError with a fixed error message.
 *
 * @class ExpiredRefreshTokenError
 * @extends {UnauthorizedError}
 *
 * @property {string} name - The name of the error, set to 'ExpiredRefreshTokenError'.
 */
class ExpiredRefreshTokenError extends UnauthorizedError {
    /**
     * Constructs a new ExpiredRefreshTokenError with a predefined message.
     */
    constructor() {
        super("Refresh token has expired!");
        this.name = "ExpiredRefreshTokenError";
    }
}

export default ExpiredRefreshTokenError;
