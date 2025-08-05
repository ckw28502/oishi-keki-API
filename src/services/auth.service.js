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
 * Authenticates a user based on username and password.
 * 
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A promise that resolves to an object containing access and refresh tokens.
 * @throws {Error} - Throws an error if the username or password is incorrect.
 */
const login = async (username, password) => {
    // Check if the provided username and password match any of the credentials
    const user = credentials.find(cred => cred.username.toLowerCase() === username.toLowerCase() && cred.password === password);

    // If no matching credentials found, throw an error
    if (!user) {
        throw new InvalidCredentialsError(); 
    }

    // Generate authentication tokens for the user based on their role
    const tokens = generateTokens(user.role);
    
    return tokens;
};

export default { login };