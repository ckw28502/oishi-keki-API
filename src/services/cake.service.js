import { Op } from "sequelize";
import Cake from "../models/cake.js"
import { convertCakesToDtos, convertCakeToDto } from "../dto/cake.dto.js";
import cakeRepository from "../repositories/cake.repository.js";

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
    const offset = (page - 1) * limit;

    const [sortParam, sortDirection] = sort.split("_");

    const { count, cakes, totalPages } = await cakeRepository.getCakes({
        offset,
        limit,
        nameFilter,
        sortParam,
        sortDirection: sortDirection.toUpperCase()
    })

    return {
        cakes: convertCakesToDtos(cakes),
        totalPages,
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
const createCake = async (reqBody) => {
    // Create a new cake record in the database
    const cake = await cakeRepository.createCake(reqBody);

    return { cake: convertCakeToDto(cake) };
}

export default { getCakes, createCake };