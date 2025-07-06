import { describe, expect, it } from "vitest";
import { ROLES } from "../../src/constants/role.js";
import { generateTokens, verifyToken } from "../../src/utils/jwt.js";
import jwt from 'jsonwebtoken';
import env from "../../src/config/env.js";
import crypto from 'crypto';

describe('JWT Utility', () => {
    const role = ROLES.OWNER;

    describe('generateTokens', () => {
        it('should generate valid access and refresh tokens for owner role', () => {
            // Act
            const { accessToken, refreshToken } = generateTokens(role);

            // Assert
            // Check if tokens are defined
            expect(accessToken).toBeDefined();
            expect(refreshToken).toBeDefined();

            // Check the access token
            expect(typeof accessToken).toBe("string");
            
            // Verify the access token payload
            const accessTokenPayload = jwt.verify(accessToken, env.JWT_ACCESS_TOKEN_SECRET);
            expect(accessTokenPayload).toBeDefined();
            
            expect(accessTokenPayload.role).toBeDefined();
            expect(accessTokenPayload.role).toBe(role);

            // Check the refresh token
            expect(typeof refreshToken).toBe("string");

            // Verify the refresh token payload
            const refreshTokenPayload = jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN_SECRET);
            expect(refreshTokenPayload).toBeDefined();
            
            expect(refreshTokenPayload.role).toBeDefined();
            expect(refreshTokenPayload.role).toBe(role);
        });
    });

    describe('verifyToken', () => {
        // Generate a random JWT secret for testing
        const generateSecret = () => {
            // Generate a random secret for testing
            return crypto.randomBytes(64).toString('hex');
        }   

        // Generate a valid token for testing and its generated secret
        const generateTokenAndSecret = () => {  
            const jwtSecret = generateSecret();          
            const token = jwt.sign({ role }, jwtSecret, { expiresIn: '1m' }); 

            return { token, jwtSecret };
        }

        it('should verify a valid access token', () => {
            // Arrange
            const { token, jwtSecret } = generateTokenAndSecret();

            // Act
            const payload = verifyToken(token, jwtSecret);

            // Assert
            expect(payload).toBeDefined();
            expect(payload.role).toBe(role);
        });

        it('should return null for an invalid access token', () => {
            // Arrange
            const jwtSecret = generateSecret();
            
            // Generate a token with a different secret
            let { anotherToken, anotherJwtSecret } = generateTokenAndSecret();
            while (anotherJwtSecret === jwtSecret) {
                ({ anotherToken, anotherJwtSecret } = generateTokenAndSecret()); // Ensure the secret is different
            }
            
            // Act
            const payload = verifyToken(anotherToken, jwtSecret);

            // Assert
            expect(payload).toBeNull();
        });
    });
})