import { describe, expect, it } from "vitest";
import { Roles } from "../../src/constants/role.js";
import { generateTokens, verifyToken } from "../../src/utils/jwt.js";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import env from "../../src/config/env.js";
import crypto from 'crypto';

describe('JWT Utility', () => {
    const role = Roles.Owner;

    describe('generateTokens', () => {
        it('should generate valid access and refresh tokens for owner role', () => {
            // Act: Generate both tokens using utility
            const { accessToken, refreshToken } = generateTokens(role);

            // Assert: Tokens should be defined and valid strings
            expect(accessToken).toBeDefined();
            expect(refreshToken).toBeDefined();
            expect(typeof accessToken).toBe("string");
            expect(typeof refreshToken).toBe("string");

            // Assert: Access token should contain correct role payload
            const accessTokenPayload = jwt.verify(accessToken, env.JWT_ACCESS_TOKEN_SECRET);
            expect(accessTokenPayload).toBeDefined();
            expect(accessTokenPayload.role).toBe(role);

            // Assert: Refresh token should contain correct role payload
            const refreshTokenPayload = jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN_SECRET);
            expect(refreshTokenPayload).toBeDefined();
            expect(refreshTokenPayload.role).toBe(role);
        });
    });

    describe('verifyToken', () => {
        // Helper: Generate a random secret
        const generateSecret = () => {
            return crypto.randomBytes(64).toString('hex');
        };

        // Helper: Generate a signed token and its secret
        const generateTokenAndSecret = (duration = "1m") => {
            const jwtSecret = generateSecret();
            const token = jwt.sign({ role }, jwtSecret, { expiresIn: duration });
            return { token, jwtSecret };
        };

        it('should throw JsonWebTokenError for a token signed with a different secret', () => {
            // Arrange: Generate a token using one secret, and try to verify using a different one
            const actualJwtSecret = generateSecret();
            let { token, jwtSecret } = generateTokenAndSecret();
            while (actualJwtSecret === jwtSecret) {
                ({ token, jwtSecret } = generateTokenAndSecret());
            }

            // Act + Assert: Expect the verification to fail
            expect(() => verifyToken(token, actualJwtSecret)).toThrow(JsonWebTokenError);
        });

        it('should successfully verify a valid access token', () => {
            // Arrange: Create a token with valid duration
            const { token, jwtSecret } = generateTokenAndSecret();

            // Act: Verify the token
            const payload = verifyToken(token, jwtSecret);

            // Assert: Payload should be valid and match role
            expect(payload).toBeDefined();
            expect(payload.role).toBe(role);
        });
    });
});
