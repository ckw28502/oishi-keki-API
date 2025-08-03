import { describe, expect, it } from "vitest";
import { Roles } from "../../src/constants/role.js";
import { generateTokens, verifyToken } from "../../src/utils/jwt.js";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import env from "../../src/config/env.js";
import crypto from 'crypto';
import ExpiredAccessTokenError from "../../src/errors/401/expiredAccessToken.error.js";
import TokenNotExpiredError from "../../src/errors/400/tokenNotExpired.error.js";

describe('JWT Utility', () => {
    const role = Roles.Owner;

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
        const generateTokenAndSecret = (duration = "1m") => {  
            const jwtSecret = generateSecret();          
            const token = jwt.sign({ role }, jwtSecret, { expiresIn: duration }); 

            return { token, jwtSecret };
        }

        it('should throw exception for an invalid access token', () => {
            // Arrange
            const actualJwtSecret = generateSecret();
            
            // Generate a token with a different secret
            let { token, jwtSecret } = generateTokenAndSecret();
            while (actualJwtSecret === jwtSecret) {
                ({ token, jwtSecret } = generateTokenAndSecret()); // Ensure the secret is different
            }
            
            // Act + Assert
            expect(() => verifyToken(token, actualJwtSecret)).toThrow(jwt.JsonWebTokenError);
        });

        it('should throw ExpiredAccessTokenError for expired token', async () => {
            // Arrange
            const { token, jwtSecret } = generateTokenAndSecret("1ms");
            
            await new Promise(resolve => setTimeout(resolve, 2));
            
            // Act + Assert
            expect(() => verifyToken(token, jwtSecret)).toThrow(ExpiredAccessTokenError);
        });

        it('should verify a valid access token', () => {
            // Arrange
            const { token, jwtSecret } = generateTokenAndSecret();

            // Act
            const payload = verifyToken(token, jwtSecret);

            // Assert
            expect(payload).toBeDefined();
            expect(payload.role).toBe(role);
        });

        it('should throw TokenNotExpiredError when the token is expected to be expired', () => {
            // Arrange
            const { token, jwtSecret } = generateTokenAndSecret();

            // Act + Assert
            expect(() => verifyToken(token, jwtSecret, true)).toThrow(TokenNotExpiredError);
        });

        it('should verify the expired token if the token is expected to be expired', async () => {
            // Arrange
            const { token, jwtSecret } = generateTokenAndSecret("1ms");
            
            await new Promise(resolve => setTimeout(resolve, 2));
            
            // Act
            const payload = verifyToken(token, jwtSecret, true);

            // Assert
            expect(payload).toBeDefined();
            expect(payload.role).toBe(role);
        });

    });
})