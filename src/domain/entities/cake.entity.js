/**
 * Represents a Cake entity in the domain layer.
 * Encapsulates cake properties and provides read-only access.
 */
class CakeEntity {
    /** @type {string | null} - Unique identifier of the cake */
    #id;

    /** @type {string} - Name of the cake */
    #name;

    /** @type {number} - Price of the cake */
    #price;

    /**
     * Creates a new CakeEntity.
     *
     * @param {Object} params - Parameters for creating a CakeEntity
     * @param {string} [params.id=null] - Optional unique identifier. Use null for new cakes.
     * @param {string} params.name - Name of the cake.
     * @param {number} params.price - Price of the cake.
     */
    constructor({ id = null, name, price }) {
        this.#id = id;
        this.#name = name;
        this.#price = price;
    }

    /** @returns {string | null} - Gets the cake ID */
    get id() {
        return this.#id;
    }

    /** @returns {string} - Gets the cake name */
    get name() {
        return this.#name;
    }

    /** @returns {number} - Gets the cake price */
    get price() {
        return this.#price;
    }
}

export default CakeEntity;
