import CakeEntity from "../domain/entities/cake.entity.js";
import CakeDTO from "../dto/cake.dto.js";

/**
 * Converts an array of CakeEntity instances to CakeDTO instances.
 *
 * @param {CakeEntity[]} entities - Array of CakeEntity objects
 * @returns {CakeDTO[]} Array of CakeDTO objects
 */
const convertCakesEntitiesToDtos = (entities) => {
    return entities.map(entity => new CakeDTO(entity));
}

/**
 * Converts an array of Sequelize Cake model instances to CakeEntity instances.
 *
 * @param {Object[]} models - Array of Cake model objects from the database
 * @returns {CakeEntity[]} Array of CakeEntity objects
 */
const convertCakesModelsToEntities = (models) => {
    return models.map(model => new CakeEntity(model));
}

export {
    convertCakesEntitiesToDtos,
    convertCakesModelsToEntities
};
