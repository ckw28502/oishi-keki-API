/**
 * Data Transfer Object (DTO) for Cake.
 * Used to transfer cake data between layers (e.g., service to controller or API response).
 */
class CakeDTO {
    /**
     * Creates a new CakeDTO.
     *
     * @param {Object} params - Cake properties
     * @param {string} params.id - Unique identifier of the cake
     * @param {string} params.name - Name of the cake
     * @param {number} params.price - Price of the cake
     */
    constructor({ id, name, price }) {
        /** @type {string} - Unique identifier of the cake */
        this.id = id;

        /** @type {string} - Name of the cake */
        this.name = name;

        /** @type {number} - Price of the cake */
        this.price = price;
    }
}

export default CakeDTO;
