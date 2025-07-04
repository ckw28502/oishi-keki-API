import { describe, it, expect } from "vitest";
import authService from "../../../services/auth/auth.service.js";
import { InvalidCredentialsError } from "../../../errors/400/invalidCredentials.error.js";
import { verifyToken } from "../../../utils/jwt.js"; 
import { ROLES } from "../../../constants/role.js";

describe('Authentication service', () => { 
    describe('Login', () => { 
        it.each([
            {
                username: "invalidUser",
                password: "invalidPassword",
                testCase: "invalid username and password"
            },
            {
                username: "invalidUser",
                password: "owner",
                testCase: "invalid username and valid password"
            },
            {
                username: "owner",
                password: "invalidPassword",
                testCase: "valid username and invalid password"
            }
        ])('Should throw InvalidCredentialsError for $testCase', async ({ username, password }) => {
            await expect(authService.login(username, password)).rejects.toThrow(InvalidCredentialsError);
        });

        it.each([
            {
                "username": "owner",
                "password": "owner",
                "role": ROLES.OWNER
            },
            {
                "username": "employee",
                "password": "employee",
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
            const accessTokenPayload = verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
            expect(accessTokenPayload).toBeDefined();
            
            expect(accessTokenPayload.role).toBeDefined();
            expect(accessTokenPayload.role).toBe(role);
            

            // Check if tokens are strings
            expect(tokens.refreshToken).toBeDefined();

            const refreshToken = tokens.refreshToken;
            expect(typeof refreshToken).toBe("string");

            // Verify the refresh token payload
            const refreshTokenPayload = verifyToken(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
            expect(refreshTokenPayload).toBeDefined();
            
            expect(refreshTokenPayload.role).toBeDefined();
            expect(refreshTokenPayload.role).toBe(role);
            
        })
     })    
})