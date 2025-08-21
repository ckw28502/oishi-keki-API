import { Op } from "sequelize";
import Cake from "../models/cake.js"

/**
 * Retrieves a paginated list of cakes with optional filtering and sorting.
 *
 * @async
 * @function getCakes
 * @param {Object} params - Parameters for fetching cakes.
 * @param {number} params.offset - The number of records to skip (for pagination).
 * @param {number} params.limit - The maximum number of records to return.
 * @param {string} [params.nameFilter] - Optional case-insensitive filter for cake name.
 * @param {string} params.sortParam - Column name to sort by (e.g., "name", "price").
 * @param {"ASC" | "DESC"} params.sortDirection - Sort direction (ascending or descending).
 * @returns {Promise<{ count: number, totalPages: number, cakes: Cake[] }>}
 *          An object containing the total count, total pages, and the list of cake records.
 */
const getCakes = async ({ offset, limit, nameFilter, sortParam, sortDirection }) => {
    // Build the "where" clause dynamically if a name filter is provided
    const where = {};
    if (nameFilter) {
        where.name = {
            [Op.iLike]: `%${nameFilter}%` // case-insensitive search
        };
    }

    // Define sorting based on params
    const order = [[sortParam, sortDirection]];

    // Perform query with pagination, filtering, and sorting
    const { count, rows } = await Cake.findAndCountAll({ 
        where,
        offset,
        limit,
        order
    });

    return { 
        count, 
        totalPages: Math.ceil(count / limit),
        cakes: rows 
    };
};

/**
 * Creates a new cake record in the database.
 *
 * @async
 * @function createCake
 * @param {Object} cake - The cake data to create.
 * @param {string} cake.name - Name of the cake.
 * @param {number} cake.price - Price of the cake.
 * @returns {Promise<Cake>} The newly created cake record.
 *
 */
const createCake = async (cake) => {
   return await Cake.create(cake);
};

export default { 
    getCakes,
    createCake
};
