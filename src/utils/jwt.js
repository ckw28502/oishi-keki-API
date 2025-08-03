import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import ExpiredAccessTokenError from '../errors/401/expiredAccessToken.error.js';
import TokenNotExpiredError from '../errors/400/tokenNotExpired.error.js';

/** * Generates a JWT token with the given payload, secret, and expiration time.
 *
 * @param {string} role - The role of the user (e.g., 'owner', 'employee').
 * @param {string} secret - The secret key used to sign the token.
 * @param {string} expiresIn - The duration for which the token is valid (e.g., '1h', '2d').
 * @returns {string} - The generated JWT token.
 */
const generateToken = (role, secret, expiresIn) => {
    return jwt.sign({ role }, secret, { expiresIn })
}

/** * Generates access and refresh tokens for a user based on their role.
 * @param {string} role - The role of the user (e.g., 'owner', 'employee').
 * @returns {object} - An object containing the generated access and refresh tokens.    
 * 
 */
const generateTokens = (role) => {
    // Generate access token with a short expiration time
    const accessToken = generateToken(role, env.JWT_ACCESS_TOKEN_SECRET, '1m');

    // Generate refresh token with a longer expiration time
    const refreshToken = generateToken(role, env.JWT_REFRESH_TOKEN_SECRET, '7d');

    return { accessToken, refreshToken };
}



/**
 * Verifies a JWT token using the provided secret and handles expected expiration logic.
 * 
 * @param {string} token - The JWT token to verify.
 * @param {string} secret - The secret key used to verify the token.
 * @param {boolean} [expectExpired=false] - Whether the token is expected to be expired.
 *   - If `false`, verification proceeds normally. If the token is expired, an `ExpiredAccessTokenError` is thrown.
 *   - If `true`, and the token is **not** expired, a `TokenNotExpiredError` is thrown.
 *   - If `true`, and the token **is** expired, the decoded payload is returned without verifying the signature.
 * 
 * @returns {object} - The decoded token payload if valid or expired (depending on `expectExpired`).
 * 
 * @throws {ExpiredAccessTokenError} - When token is expired but `expectExpired` is false.
 * @throws {TokenNotExpiredError} - When token is not expired but `expectExpired` is true.
 * @throws {Error} - For other JWT verification errors.
 */
const verifyToken = (token, secret, expectExpired = false) => {
    try {
        const payload = jwt.verify(token, secret);

        if (expectExpired) {
            throw new TokenNotExpiredError();
        }

        return payload;
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            if (!expectExpired) {
                throw new ExpiredAccessTokenError();
            }

            return jwt.decode(token);
        }
        throw error;
    }
}


export {
    generateTokens,
    verifyToken
}