import ForbiddenError from "./forbidden.error.js";

/**
 * Custom error to represent a user with an invalid role attempting to access a restricted endpoint.
 * Extends ForbiddenError with a fixed error message.
 * 
 * @class
 * @extends ForbiddenError
 * @property {string} name - The name of the error, set to 'InvalidRoleError'.
 */
class InvalidRoleError extends ForbiddenError {
    /**
     * Creates an instance of InvalidRoleError.
     * Sets a default error message for insufficient permissions.
     */
    constructor() {
        super("This user does not have authorization for this endpoint!");
        this.name = "InvalidRoleError";
    }
}

export default InvalidRoleError;
