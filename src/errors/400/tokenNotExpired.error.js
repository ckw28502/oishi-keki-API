import BadRequestError from "./badRequest.error.js";

/**
 * Custom error thrown when a token is expected to be expired but is still valid.
 * Extends the BadRequestError to indicate a client-side misuse.
 *
 * @class TokenNotExpiredError
 * @extends {BadRequestError}
 *
 * @property {string} name - The name of the error, set to 'TokenNotExpiredError'.
 */
class TokenNotExpiredError extends BadRequestError {
    /**
     * Constructs a new TokenNotExpiredError instance with a predefined message.
     */
    constructor() {
        super("Token is not expired yet!");
        this.name = "TokenNotExpiredError";
    }
}

export default TokenNotExpiredError;
