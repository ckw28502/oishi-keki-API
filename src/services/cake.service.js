import { Op } from "sequelize";
import Cake from "../models/cake.js"

const getCakes = async ({ page, limit, nameFilter, sortParam, isAscending }) => {
    const offset = (page - 1) * limit;

    const where = {};
    if (nameFilter) {
        where.name = {
            [Op.iLike]: `%${nameFilter}%`
        };
    }

    const order = [[sortParam, isAscending ? "ASC" : "DESC"]];

    const { count, rows } = await Cake.findAndCountAll({ 
        where,
        offset,
        limit,
        order
    });

    return {
        cakes: rows,
        totalPages: Math.ceil(count / limit),
        count
    };

}

/**
 * Handle the creation of a new cake object in the database.
 * 
 * @param {string} name - The name of the cake to be created.
 * @param {string} price - The price of the cake to be created.
 */
const createCake = async ({ name, price }) => {
    // Create a new cake record in the database
    return await Cake.create({ name, price });
}


export default { getCakes, createCake };