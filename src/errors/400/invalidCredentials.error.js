import BadRequestError from "./badRequest.error.js";

/**
 * Custom error to represent invalid login credentials.
 * Extends BadRequestError with a fixed error message.
 * 
 * @class
 * @extends BadRequestError
 * * @property {string} name - The name of the error, set to 'InvalidCredentialsError'.
 */
class InvalidCredentialsError extends BadRequestError {
    /**
     * Creates an instance of InvalidCredentialsError.
     * Sets a default error message for invalid username or password.
     */
    constructor() {
        super("Nama pengguna atau kata sandi salah");
        this.name = "InvalidCredentialsError";
    }
}

export default InvalidCredentialsError;
