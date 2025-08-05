import Cake from "../models/cake.js"

/**
 * Handle the creation of a new cake object in the database.
 * 
 * @param {string} name - The name of the cake to be created.
 * @param {string} price - The price of the cake to be created.
 */
const createCake = async (name, price) => {
    // Create a new cake record in the database
    return await Cake.create({ name, price });
}

export default { createCake };