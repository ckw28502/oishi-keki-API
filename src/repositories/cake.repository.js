import { Op } from "sequelize";
import Cake from "../domain/models/cake.model.js";
import { convertCakesModelsToEntities } from "../mappers/cake.mapper.js";
import CakeEntity from "../domain/entities/cake.entity.js";
import CakeNotFoundError from "../errors/400/cakeNotFound.error.js";

/**
 * Retrieves a paginated list of cakes from the database with optional filtering and sorting.
 *
 * @async
 * @param {Object} params - Parameters for fetching cakes.
 * @param {number} params.offset - Number of records to skip (for pagination).
 * @param {number} params.limit - Maximum number of records to return.
 * @param {string} [params.nameFilter] - Optional filter for cake name (case-insensitive, partial match).
 * @param {string} params.sortParam - Column name to sort by (e.g., "name" or "price").
 * @param {"ASC"|"DESC"} params.sortDirection - Sort direction (ascending or descending).
 * @returns {Promise<{ count: number, totalPages: number, cakes: CakeEntity[] }>} 
 *          Object containing total count, total pages, and array of CakeEntity instances.
 */
const getCakes = async ({ offset, limit, nameFilter, sortParam, sortDirection }) => {
    const where = {};
    if (nameFilter) {
        where.name = {
            [Op.iLike]: `%${nameFilter}%`
        };
    }

    const order = [[sortParam, sortDirection]];

    const { count, rows } = await Cake.findAndCountAll({
        where,
        offset,
        limit,
        order
    });

    const cakes = convertCakesModelsToEntities(rows);

    return {
        count,
        totalPages: Math.ceil(count / limit),
        cakes
    };
};

/**
 * Creates a new cake record in the database from a CakeEntity.
 *
 * @async
 * @param {CakeEntity} cakeEntity - Cake entity containing name and price (id is ignored).
 * @returns {Promise<CakeEntity>} The newly created cake as a CakeEntity instance.
 */
const createCake = async (cakeEntity) => {
    const { name, price } = cakeEntity;
    const newCake = await Cake.create({ name, price });
    return new CakeEntity(newCake);
};

/**
 * Updates an existing cake entity in the database.
 *
 * @async
 * @param {CakeEntity} cakeEntity - The cake object containing updated data.
 * @throws {CakeNotFoundError} If no cake with the given ID exists in the database.
 * @returns {Promise<void>} Resolves if the update is successful, otherwise throws.
 *
 */
const editCake = async (cakeEntity) => {
    const [affectedCount] = await Cake.update(
        { name: cakeEntity.name, price: cakeEntity.price },
        { where: { id: cakeEntity.id }, returning: true }
    );

    if (affectedCount === 0) {
        throw new CakeNotFoundError();
    }
};

/**
 * Updates an existing cake entity in the database.
 *
 * @async
 * @param {string} id - The cake identifier.
 * @throws {CakeNotFoundError} If no cake with the given ID exists in the database.
 * @returns {Promise<void>} Resolves if the update is successful, otherwise throws.
 *
 */
const deleteCake = async (id) => {
    const affectedCount = await Cake.destroy({
        where: { id }
    });

    if (affectedCount === 0) {
        throw new CakeNotFoundError();
    }
}


export default {
    getCakes,
    createCake,
    editCake,
    deleteCake
};
