import env from "../../config/env.js";
import { ROLES } from "../../constants/role.js";
import { createError } from "../../utils/errors.js";

// This file handles user authentication by checking credentials against predefined values.
const credentials = [
    {
        username: env.OWNER_USER,
        password: env.OWNER_PASSWORD,
        role: ROLES.OWNER
    },
    {
        username: env.EMPLOYEE_USER,
        password: env.EMPLOYEE_PASSWORD,
        role: ROLES.EMPLOYEE
    },
];

/** * Authenticates a user based on username and password.
 * 
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} - Returns the role of the authenticated user.
 * @throws {Error} - Throws an error if authentication fails.
 */
const login = async (username, password) => {
    // Check if the provided username and password match any of the credentials
    const user = credentials.find(cred => cred.username === username && cred.password === password);

    // If no matching credentials found, throw an error
    if (!user) {
        throw createError(400, "Nama pengguna atau kata sandi salah"); 
    }

    return user.role;
};



export default { login };