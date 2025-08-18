import assert from "assert";

/**
 * Assert that a cake object matches the expected result.
 *
 * Compares only specific fields (`name` and `price`) between the cake object
 * and the expected result, ignoring fields that may be auto-generated
 * (e.g., `id`, timestamps).
 *
 * @param {{ name: string, price: number }} actualCake - The actual cake object returned (e.g., from API response).
 * @param {{ name: string, price: number }} expectedCake - The expected cake values to assert against.
 *
 * @throws {AssertionError} If any of the compared fields do not match.
 *
 */
const assertCake = (actualCake, expectedCake) => {
    assert.strictEqual(actualCake.name, expectedCake.name);
    assert.strictEqual(actualCake.price, expectedCake.price);
};

export { assertCake };
