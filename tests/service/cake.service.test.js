import { afterEach, describe, expect, it, vi } from "vitest";
import Cake from "../../src/models/cake.js";
import cakeService from "../../src/services/cake.service";

vi.mock("../../src/models/cake.js");

describe('Cake service', () => {
    const cakeData = {
        name: "Chiffon cake",
        price: "100000"
    };

    afterEach(() => {
        // Clear mock state after each test to avoid interference
        vi.clearAllMocks();
    });

    describe("Create cake", () => {
        it('should throw an error when Cake.create fails', async () => {
            // Arrange: simulate a DB error when creating a cake
            const error = new Error("DB Error");
            Cake.create.mockRejectedValue(error);

            // Act + Assert: expect the service to throw the same error
            await expect(cakeService.createCake(cakeData.name, cakeData.price)).rejects.toThrow(error.message);
        });

        it('should return the created cake object when Cake.create succeeds', async () => {
            // Arrange: mock a successful cake creation
            const expectedResult = { id: 1, ...cakeData };
            Cake.create.mockResolvedValue(expectedResult);

            // Act: call the service with valid data
            const actualResult = await cakeService.createCake(cakeData.name, cakeData.price);

            // Assert: verify correct DB call and return value
            expect(Cake.create).toHaveBeenCalledExactlyOnceWith(cakeData);
            expect(actualResult).toEqual(expectedResult);
        });
    });
});
