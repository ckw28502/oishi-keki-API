import { describe, it, expect } from "vitest";
import authService from "../../src/services/auth.service.js";
import { InvalidCredentialsError } from "../../src/errors/400/invalidCredentials.error.js";
import { verifyToken } from "../../src/utils/jwt.js"; 
import { Roles } from "../../src/constants/role.js";
import env from "../../src/config/env.js";
import { randomBytes } from 'crypto';

describe('Authentication service', () => { 

    const assertTokens = (tokens, role) => {
        // Assert: Token object should be defined
            expect(tokens).toBeDefined();

            // Assert: Verify access token
            expect(tokens.accessToken).toBeDefined();
            expect(typeof tokens.accessToken).toBe("string");

            // Assert: Verify access token payload
            const accessTokenPayload = verifyToken(tokens.accessToken, env.JWT_ACCESS_TOKEN_SECRET);
            expect(accessTokenPayload).toBeDefined();
            expect(accessTokenPayload.role).toBeDefined();
            expect(accessTokenPayload.role).toBe(role);

            // Assert: Verify refresh token
            expect(tokens.refreshToken).toBeDefined();
            expect(typeof tokens.refreshToken).toBe("string");

            // Asserts: Verify refresh token payload
            const refreshTokenPayload = verifyToken(tokens.refreshToken, env.JWT_REFRESH_TOKEN_SECRET);
            expect(refreshTokenPayload).toBeDefined();
            expect(refreshTokenPayload.role).toBeDefined();
            expect(refreshTokenPayload.role).toBe(role);
    }

    describe('Login', () => { 
        // Helper: Generate a random string for invalid credentials
        const generateRandomString = () => {
            return randomBytes(32).toString("hex");
        };

        // Test invalid login scenarios
        it.each([
            {
                username: generateRandomString(),
                password: generateRandomString(),
                testCase: "invalid username and password"
            },
            {
                username: generateRandomString(),
                password: process.env.OWNER_PASSWORD,
                testCase: "invalid username and valid password"
            },
            {
                username: process.env.OWNER_USER,
                password: generateRandomString(),
                testCase: "valid username and invalid password"
            }
        ])('Should throw InvalidCredentialsError for $testCase', async ({ username, password }) => {
            // Act + Assert: Login attempt should throw InvalidCredentialsError
            await expect(authService.login({ username, password })).rejects.toThrow(InvalidCredentialsError);
        });

        // Test valid login scenarios for both Owner and Employee
        it.each([
            {
                username: process.env.OWNER_USER,
                password: process.env.OWNER_PASSWORD,
                role: Roles.Owner
            },
            {
                username: process.env.EMPLOYEE_USER,
                password: process.env.EMPLOYEE_PASSWORD,
                role: Roles.Employee
            }
        ])('Should return valid access token and refresh token for $username', async ({ username, password, role }) => {
            // Act: Attempt login with valid credentials
            const tokens = await authService.login({ username, password });

            // Assert: Check the tokens validity
            assertTokens(tokens, role);
        });
    });   
    
    describe('Refresh tokens', () => {
        it('should create new tokens', async () => {
            // Arrange: Set the payload of the refresh token
            const payload = { role: Roles.Owner };

            // Act: Generate new tokens from the payload
            const tokens = authService.refreshTokens(payload);

            // Assert: Check the tokens validity
            assertTokens(tokens, payload.role);
        });
    })
});
