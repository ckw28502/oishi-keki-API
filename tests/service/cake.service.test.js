import { afterEach, describe, expect, it, vi } from "vitest";
import Cake from "../../src/models/cake.js";
import cakeService from "../../src/services/cake.service";
import { convertCakesToDtos } from "../../src/dto/cake.dto.js";

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

    describe("Get cakes", () => {
        const reqParams = {
            page: 1,
            limit: 2,
            nameFilter: "",
            sort: "name_asc"
        };

        it('should throw an error when fetching cakes from database failed ', async () => {
            // Arrange: simulate a DB error when fetching cakes
            const error = new Error("DB Error");
            Cake.findAndCountAll.mockRejectedValue(error);

            // Act + Assert: expect the service to throw the same error
            await expect(cakeService.getCakes(reqParams)).rejects.toThrow(error.message);
        });

        it('should return the list of cakes when fetching cakes from database succesful', async () => {
            // Arrange: mock a successful fetch of cake list
            const mockData = {
                count: 4,
                rows: [
                    {
                        name: "Chiffon cake",
                        price: 150000
                    },
                    {
                        name: "Chocolate cake",
                        price: 170000
                    }
                ]
            };
            const expectedResult = {
                count: 4,
                totalPages: 2,
                cakes: convertCakesToDtos(mockData.rows)
            };
            
            Cake.findAndCountAll.mockResolvedValue(mockData);

            // Act: call the service with valid data
            const actualResult = await cakeService.getCakes(reqParams);

            // Assert: verify correct DB call and return value
            expect(Cake.findAndCountAll).toHaveBeenCalledExactlyOnceWith({
                offset: 0,
                where: {},
                order: [["name", "ASC"]],
                limit: reqParams.limit
            });
            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe("Create cake", () => {
        it('should throw an error when Cake.create fails', async () => {
            // Arrange: simulate a DB error when creating a cake
            const error = new Error("DB Error");
            Cake.create.mockRejectedValue(error);

            // Act + Assert: expect the service to throw the same error
            await expect(cakeService.createCake(cakeData)).rejects.toThrow(error.message);
        });

        it('should return the created cake object when Cake.create succeeds', async () => {
            // Arrange: mock a successful cake creation
            const mockCake = { id: 1, ...cakeData };
            Cake.create.mockResolvedValue(mockCake);
            
            const expectedResult = { cake: mockCake };

            // Act: call the service with valid data
            const actualResult = await cakeService.createCake(cakeData);

            // Assert: verify correct DB call and return value
            expect(Cake.create).toHaveBeenCalledExactlyOnceWith(cakeData);
            expect(actualResult).toEqual(expectedResult);
        });
    });
});
