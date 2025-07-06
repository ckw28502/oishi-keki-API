import { describe, it, expect } from "vitest";
import authService from "../../src/services/auth.service.js";
import { InvalidCredentialsError } from "../../src/errors/400/invalidCredentials.error.js";
import { verifyToken } from "../../src/utils/jwt.js"; 
import { ROLES } from "../../src/constants/role.js";
import env from "../../src/config/env.js";
import { randomBytes } from 'crypto';

describe('Authentication service', () => { 
    describe('Login', () => { 
        const generateRandomString = () => {
            return randomBytes(32).toString("hex");
        }

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
            await expect(authService.login(username, password)).rejects.toThrow(InvalidCredentialsError);
        });

        it.each([
            {
                "username": process.env.OWNER_USER,
                "password": process.env.OWNER_PASSWORD,
                "role": ROLES.OWNER
            },
            {
                "username": process.env.EMPLOYEE_USER,
                "password": process.env.EMPLOYEE_PASSWORD,
                "role": ROLES.EMPLOYEE
            }
        ])('Should return valid access token and refresh token for $username', async ({ username, password, role }) => {
            // Act
            const tokens = await authService.login(username, password);

            // Assert
            // Check if tokens are defined
            expect(tokens).toBeDefined();

            // Check the access token
            expect(tokens.accessToken).toBeDefined();

            const accessToken = tokens.accessToken;
            expect(typeof accessToken).toBe("string");
            
            // Verify the access token payload
            const accessTokenPayload = verifyToken(accessToken, env.JWT_ACCESS_TOKEN_SECRET);
            expect(accessTokenPayload).toBeDefined();
            
            expect(accessTokenPayload.role).toBeDefined();
            expect(accessTokenPayload.role).toBe(role);
            

            // Check if tokens are strings
            expect(tokens.refreshToken).toBeDefined();

            const refreshToken = tokens.refreshToken;
            expect(typeof refreshToken).toBe("string");

            // Verify the refresh token payload
            const refreshTokenPayload = verifyToken(refreshToken, env.JWT_REFRESH_TOKEN_SECRET);
            expect(refreshTokenPayload).toBeDefined();
            
            expect(refreshTokenPayload.role).toBeDefined();
            expect(refreshTokenPayload.role).toBe(role);
            
        })
     })    
})