import { BadRequestError } from "./badRequest.error.js";

export class InvalidCredentialsError extends BadRequestError {
    constructor(message = "Nama pengguna atau kata sandi salah") {
        super(message);
    }
}