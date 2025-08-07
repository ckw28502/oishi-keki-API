import env from "../config/env.js";
import { Roles } from "../constants/role.js";
import InvalidCredentialsError from "../errors/400/invalidCredentials.error.js";
import { generateTokens } from "../utils/jwt.js";

// This file handles user authentication by checking credentials against predefined values.
const credentials = [
    {
        username: env.OWNER_USER,
        password: env.OWNER_PASSWORD,
        role: Roles.Owner
    },
    {
        username: env.EMPLOYEE_USER,
        password: env.EMPLOYEE_PASSWORD,
        role: Roles.Employee
    },
];

/** 
 * Authenticates a user based on the login request body.
 * 
 * @param {Object} requestBody - The request body containing login credentials.
 * @param {string} requestBody.username - The username of the user.
 * @param {string} requestBody.password - The password of the user.
 * @returns {Promise<Object>} A promise resolving to an object with access and refresh tokens.
 * @throws {InvalidCredentialsError} Throws if username or password is invalid.
 */
const login = async ({ username, password }) => {
    // Check if the provided username and password match any of the credentials
    const user = credentials.find(cred => cred.username.toLowerCase() === username.toLowerCase() && cred.password === password);

    // If no matching credentials found, throw an error
    if (!user) {
        throw new InvalidCredentialsError(); 
    }

    // Generate authentication tokens for the user based on their role
    return generateTokens(user.role);
};



/**
 * Refreshes tokens by generating a new pair of tokens based on the user's role.
 *
 * @param {Object} payload - The payload object extracted from the verified refresh token.
 * @param {string} payload.role - The user's role used to generate the new tokens.
 *
 * @returns {{ accessToken: string, refreshToken: string }} An object containing new access and refresh tokens.
 */
const refreshTokens = ({ role }) => {
    // Generate a new access and refresh token based on the user's role
    return generateTokens(role);
};


export default { login, refreshTokens };