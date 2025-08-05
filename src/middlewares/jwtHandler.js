import MissingAuthorizationHeaderError from "../errors/401/missingAuthorizationHeader.error.js";
import { verifyToken } from "../utils/jwt.js";
import env from "../config/env.js";
import ExpiredAccessTokenError from "../errors/401/expiredAccessToken.error.js";
import ExpiredRefreshTokenError from "../errors/401/expiredRefreshToken.error.js";

/**
 * Extracts the bearer token from the Authorization header.
 *
 * @param {string} authHeader - The Authorization header from the request.
 * @returns {string} The extracted token.
 * @throws {MissingAuthorizationHeaderError} If the header is missing or malformed.
 */
const getToken = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ').length !== 2) {
        throw new MissingAuthorizationHeaderError();
    }

    return authHeader.split(' ')[1];
};

/**
 * Middleware to authenticate requests using an access token.
 * 
 * - Verifies the presence and format of the Authorization header.
 * - Validates the JWT access token.
 * - Attaches the decoded payload to `req.payload` for downstream use.
 *
 * @function
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
const authenticateAccessToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = getToken(authHeader);

        // Verifies token and attaches payload
        req.payload = verifyToken(token, env.JWT_ACCESS_TOKEN_SECRET);

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ExpiredAccessTokenError();
        }
        next(error);
    }
};

/**
 * Middleware to authenticate requests using an refresh token.
 * 
 * - Verifies the presence and format of the Authorization header.
 * - Validates the JWT access token.
 * - Attaches the decoded payload to `req.payload` for downstream use.
 *
 * @function
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
const authenticateRefreshToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = getToken(authHeader);

        // Verifies token and attaches payload
        req.payload = verifyToken(token, env.JWT_REFRESH_TOKEN_SECRET);

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ExpiredRefreshTokenError();
        }
        next(error); 
    }
};



export {
    authenticateAccessToken,
    authenticateRefreshToken
};
