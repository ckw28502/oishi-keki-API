import jwt from 'jsonwebtoken';
import env from '../config/env.js';

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
export const generateTokens = (role) => {
    // Generate access token with a short expiration time
    const accessToken = generateToken(role, env.JWT_ACCESS_TOKEN_SECRET, '15m');

    // Generate refresh token with a longer expiration time
    const refreshToken = generateToken(role, env.JWT_REFRESH_TOKEN_SECRET, '7d');

    return { accessToken, refreshToken };
}



/** * Verifies a JWT token using the provided secret.
 * @param {string} token - The JWT token to verify.
 * @param {string} secret - The secret key used to verify the token.        
 * 
 * @return {object|null} - Returns the decoded token payload if verification is successful, or null if verification fails.
 */
export const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}