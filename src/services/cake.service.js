import { Op } from "sequelize";
import Cake from "../models/cake.js"
import { convertCakesToDtos, convertCakeToDto } from "../dto/cake.dto.js";

/**
 * Service to fetch paginated, filtered, and sorted list of cakes from the database.
 *
 * @param {Object} params - Query parameters for fetching cakes
 * @param {number} params.page - Current page number (1-based)
 * @param {number} params.limit - Number of items per page
 * @param {string} [params.nameFilter] - Optional filter for cake name (case-insensitive, partial match)
 * @param {string} params.sort - Column to sort by ("name" or "price")
 *
 * @returns {Promise<Object>} Returns an object containing:
 *  - cakes: Array of cake records matching the query
 *  - totalPages: Total number of pages based on count and limit
 *  - count: Total number of cakes matching the filter
 */
const getCakes = async ({ page, limit, nameFilter, sort }) => {
    console.log(sort)
    const offset = (page - 1) * limit;

    const where = {};
    if (nameFilter) {
        where.name = {
            [Op.iLike]: `%${nameFilter}%`
        };
    }

    const [sortParam, isAscending] = sort.split("_");

    const order = [[sortParam, isAscending.toUpperCase()]];

    const { count, rows } = await Cake.findAndCountAll({ 
        where,
        offset,
        limit,
        order
    });

    return {
        cakes: convertCakesToDtos(rows),
        totalPages: Math.ceil(count / limit),
        count
    };
};


/**
 * Create a new cake record in the database.
 *
 * @param {Object} requestBody - The request body containing cake details.
 * @param {string} requestBody.name - The name of the cake to be created.
 * @param {number} requestBody.price - The price of the cake to be created.
 * @returns {Promise<Object>} The created cake instance.
 */
const createCake = async ({ name, price }) => {
    // Create a new cake record in the database
    const cake = await Cake.create({ name, price });

    return { cake: convertCakeToDto(cake) };
}

export default { getCakes, createCake };