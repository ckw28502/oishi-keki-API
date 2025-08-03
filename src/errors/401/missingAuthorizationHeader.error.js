import UnauthorizedError from "./unauthorized.error.js";

/**
 * Custom error to represent a missing or malformed Authorization header.
 * Extends UnauthorizedError with a fixed error message.
 * 
 * @class MissingAuthorizationHeaderError
 * @extends {UnauthorizedError}
 * 
 * @property {string} name - The name of the error, set to 'MissingAuthorizationHeaderError'.
 */
class MissingAuthorizationHeaderError extends UnauthorizedError {
    /**
     * Constructs a new MissingAuthorizationHeaderError with a predefined message.
     */
    constructor() {
        super("Authorization header is missing or malformed!");
        this.name = "MissingAuthorizationHeaderError";
    }
}

export default MissingAuthorizationHeaderError;
