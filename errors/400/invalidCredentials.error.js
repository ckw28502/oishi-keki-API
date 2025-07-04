export class InvalidCredentialsError extends Error {
    constructor(message = "Nama pengguna atau kata sandi salah") {
        super(message);
        this.statusCode = 400; // HTTP status code for Bad Request
    }
}