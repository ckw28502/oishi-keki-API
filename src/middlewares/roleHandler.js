import InvalidRoleError from "../errors/403/invalidRole.error.js";
import { Roles } from "../constants/role.js";

/**
 * Middleware to authorize access only for users with the "Owner" role.
 *
 * - Assumes `req.payload` is already set by a previous authentication middleware.
 * - If the user's role is not "Owner", throws an `InvalidRoleError`.
 * - Otherwise, allows the request to proceed.
 *
 * @function
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
const authenticateOwner = (req, res, next) => {
    const payload = req.payload;

    // Check if user has the "Owner" role
    if (payload.role !== Roles.Owner) {
        next(new InvalidRoleError());
        return;
    }

    next(); // Proceed if authorized
};

export {
    authenticateOwner
};
