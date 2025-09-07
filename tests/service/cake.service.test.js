import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import cakeService from "../../src/services/cake.service";
import cakeRepository from "../../src/repositories/cake.repository.js";
import { convertCakesEntitiesToDtos } from "../../src/mappers/cake.mapper.js";
import CakeEntity from "../../src/domain/entities/cake.entity.js";
import { v4 as uuidv4 } from "uuid";
import CakeDTO from "../../src/dto/cake.dto.js";

vi.mock("../../src/repositories/cake.repository.js");


describe('Cake service', () => {
    const cakeData = {
        name: "Chiffon cake",
        price: "100000"
    };

    afterEach(() => {
        // Clear mock state after each test to avoid interference
        vi.clearAllMocks();
    });
    
    describe("Get cake by ID", () => {
        const id = uuidv4();

        it('should throw an error when fetching cake by ID from database failed ', async () => {
            // Arrange: simulate a DB error when fetching cake by ID
            const error = new Error("DB Error");
            cakeRepository.getCakeById.mockRejectedValue(error);

            // Act + Assert: expect the service to throw the same error
            await expect(cakeService.getCakeById(id)).rejects.toThrow(error.message);
        });

        it('should return the list of cakes when fetching cake by ID from database succesful', async () => {
            // Arrange: mock a successful fetch of cake by ID
            const mockCake = new CakeEntity({
                id,
                name: "Chocolate cake",
                price: 120000
            })
            const expectedResult = new CakeDTO(mockCake);
            
            cakeRepository.getCakeById.mockResolvedValue(mockCake);

            // Act: call the service with valid data
            const actualResult = await cakeService.getCakeById(id);

            // Assert: verify correct DB call and return value
            expect(cakeRepository.getCakeById).toHaveBeenCalledExactlyOnceWith(id);
            expect(actualResult).toEqual(expectedResult);
        });
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
            cakeRepository.getCakes.mockRejectedValue(error);

            // Act + Assert: expect the service to throw the same error
            await expect(cakeService.getCakes(reqParams)).rejects.toThrow(error.message);
        });

        it('should return the list of cakes when fetching cakes from database succesful', async () => {
            // Arrange: mock a successful fetch of cake list
            const mockData = {
                count: 4,
                cakes: [
                    {
                        name: "Chiffon cake",
                        price: 150000
                    },
                    {
                        name: "Chocolate cake",
                        price: 170000
                    }
                ],
                totalPages: 2
            };
            const expectedResult = {
                count: 4,
                totalPages: mockData.totalPages,
                cakes: convertCakesEntitiesToDtos(mockData.cakes)
            };
            
            cakeRepository.getCakes.mockResolvedValue(mockData);

            // Act: call the service with valid data
            const actualResult = await cakeService.getCakes(reqParams);

            // Assert: verify correct DB call and return value
            expect(cakeRepository.getCakes).toHaveBeenCalledExactlyOnceWith({
                limit: reqParams.limit,
                offset: 0,
                nameFilter: reqParams.nameFilter,
                sortParam: "name",
                sortDirection: "ASC"
            });
            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe("Create cake", () => {
        it('should throw an error when creating cake fails', async () => {
            // Arrange: simulate a DB error when creating a cake
            const error = new Error("DB Error");
            cakeRepository.createCake.mockRejectedValue(error);

            // Act + Assert: expect the service to throw the same error
            await expect(cakeService.createCake(cakeData)).rejects.toThrow(error.message);
        });

        it('should store a new cake when creating cake succeed', async () => {
            // Arrange: mock a successful cake creation
            const mockCreatedCake = new CakeEntity({ id: 1, ...cakeData });
            cakeRepository.createCake.mockResolvedValue(new CakeEntity({ id: 1, ...cakeData }));
            
            // Act: call the service with valid data
            await cakeService.createCake(cakeData);

            // Assert: verify correct DB call and return value
            expect(cakeRepository.createCake).toHaveBeenCalledExactlyOnceWith(new CakeEntity(cakeData));
            expect(cakeRepository.createCake).toHaveResolvedWith(mockCreatedCake);
        });
    });

    describe("Edit cake", () => {
        it('should throw an error when edit cake fails', async () => {
            // Arrange: simulate a DB error when creating a cake
            const error = new Error("DB Error");
            cakeRepository.editCake.mockRejectedValue(error);

            // Act + Assert: expect the service to throw the same error
            await expect(cakeService.editCake(cakeData)).rejects.toThrow(error.message);
        });

        it('should update the edited cake object when edit cake succeeds', async () => {
            // Arrange: mock a successful cake creation
            cakeRepository.editCake.mockResolvedValue(new CakeEntity({ id: 1, ...cakeData }));
            
            // Act: call the service with valid data
            await cakeService.editCake(cakeData);

            // Assert: verify correct DB call and return value
            expect(cakeRepository.editCake).toHaveBeenCalledExactlyOnceWith(new CakeEntity(cakeData));
        });
    });

    describe("Delete cake", () => {
        it('should throw an error when delete cake fails', async () => {
            // Arrange: simulate a DB error when creating a cake
            const error = new Error("DB Error");
            cakeRepository.deleteCake.mockRejectedValue(error);

            // Act + Assert: expect the service to throw the same error
            await expect(cakeService.deleteCake(uuidv4())).rejects.toThrow(error.message);
        });

        it('should delete the cake when delete cake succeeds', async () => {
            // Arrange: mock a successful cake creation
            cakeRepository.deleteCake.mockResolvedValue();
            const id = uuidv4();
            
            // Act: call the service with valid data
            await cakeService.deleteCake(id);

            // Assert: verify correct DB call and return value
            expect(cakeRepository.deleteCake).toHaveBeenCalledExactlyOnceWith(id);
        });
    })
});
