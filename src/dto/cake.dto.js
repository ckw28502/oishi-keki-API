/**
 * Converts a single cake object into a Data Transfer Object (DTO) 
 * by returning only the relevant public fields.
 *
 * @param {Object} cake - The cake object to convert.
 * @param {string} cake.id - Unique identifier of the cake.
 * @param {string} cake.name - Name of the cake.
 * @param {number} cake.price - Price of the cake in smallest currency unit (e.g., Rupiah).
 * @returns {Object} The cake DTO with only `id`, `name`, and `price`.
 */
const convertCakeToDto = (cake) => {
    return {
        id: cake.id,
        name: cake.name,
        price: cake.price
    };
};

/**
 * Converts an array of cake objects into an array of cake DTOs.
 * Uses `convertCakeToDto` internally for each element.
 *
 * @param {Object[]} cakes - Array of cake objects to convert.
 * @returns {Object[]} An array of cake DTOs with only `id`, `name`, and `price`.
 */
const convertCakesToDtos = (cakes) => {
    return cakes.map(cake => convertCakeToDto(cake));
};


export { convertCakeToDto, convertCakesToDtos };