import BadRequestError from "./badRequest.error.js";

/**
 * Custom error to represent invalid cake id.
 * Extends BadRequestError with a fixed error message.
 * 
 * @class
 * @extends BadRequestError
 * * @property {string} name - The name of the error, set to 'CakeNotFoundError'.
 */
class CakeNotFoundError extends BadRequestError {
    /**
     * Creates an instance of CakeNotFoundError.
     * Sets a default error message for invalid cake id.
     */
    constructor() {
        super("Kue tidak ditemukan!");
        this.name = "CakeNotFoundError";
    }
}

export default CakeNotFoundError;
