import { Given, When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import app from '../../../../index.js';
import jwt from 'jsonwebtoken';
import { ROLES } from '../../../../constants/role.js';
import assert from 'assert';
import { InvalidCredentialsError } from '../../../../errors/400/invalidCredentials.error.js';

Given('the user has a valid email and password for owner', function () {
    this.username = 'owner';
    this.password = 'owner';
});

Given('the user has a valid email and password for employee', function () {
    this.username = 'employee';
    this.password = 'employee';
});

Given('the user has an invalid email or password', function () {
    this.username = 'invalidUser';
    this.password = 'invalidPassword';
})

Given('the username does not exists and password does not exists', function () {
    this.username = '';
    this.password = '';
});

Given('the username exists and password does not exists', function () {
    this.username = "owner";
    this.password = '';
});

Given('the username does not exists and password exists', function () {
    this.username = '';
    this.password = 'owner'; 
});

When('the user attempts to log in', async function () {
    this.response = await request(app)
        .post('/api/v1/auth/login')
        .send({
            username: this.username,
            password: this.password
        })
        .set('Accept', 'application/json');
});

Then('the user should receive a success response', function () {
    assert.deepStrictEqual(this.response.status, 200);
});

Then('the response should contain a JWT token with owner permissions', function () {
    const responseBody = this.response.body;

    // Check if the response body is not null
    assert.ok(responseBody);

    // Check if the access token is present in the response body
    assert.ok(responseBody.accessToken);

    // Check if the access token is a string
    const accessToken = responseBody.accessToken;
    assert.strictEqual(typeof accessToken, 'string');

    const accessTokenPayload = jwt.decode(accessToken);
    
    // Check if the access token payload is not null
    assert.ok(accessTokenPayload);

    const accessTokenRole = accessTokenPayload.role;
    // Check if the role in the access token payload is 'owner'
    assert.strictEqual(accessTokenRole, ROLES.OWNER);

    // Check if the refreshToken is present in the response body
    assert.ok(responseBody.refreshToken);

    // Check if the refresh token is a string
    const refreshToken = responseBody.refreshToken;
    assert.strictEqual(typeof refreshToken, 'string');

    const refreshTokenPayload = jwt.decode(refreshToken);
    
    // Check if the refresh token payload is not null
    assert.ok(refreshTokenPayload);

    const refreshTokenRole = refreshTokenPayload.role;
    // Check if the role in the refresh token payload is 'owner'
    assert.strictEqual(refreshTokenRole, ROLES.OWNER);

});

Then('the response should contain a JWT token with employee permissions', function () {
    const responseBody = this.response.body;

    // Check if the response body is not null
    assert.ok(responseBody);

    // Check if the access token is present in the response body
    assert.ok(responseBody.accessToken);

    // Check if the access token is a string
    const accessToken = responseBody.accessToken;
    assert.strictEqual(typeof accessToken, 'string');

    const accessTokenPayload = jwt.decode(accessToken);
    
    // Check if the access token payload is not null
    assert.ok(accessTokenPayload);

    const accessTokenRole = accessTokenPayload.role;
    // Check if the role in the access token payload is 'employee'
    assert.strictEqual(accessTokenRole, ROLES.EMPLOYEE);

    // Check if the refreshToken is present in the response body
    assert.ok(responseBody.refreshToken);

    // Check if the refresh token is a string
    const refreshToken = responseBody.refreshToken;
    assert.strictEqual(typeof refreshToken, 'string');

    const refreshTokenPayload = jwt.decode(refreshToken);
    
    // Check if the refresh token payload is not null
    assert.ok(refreshTokenPayload);

    const refreshTokenRole = refreshTokenPayload.role;
    // Check if the role in the refresh token payload is 'employee'
    assert.strictEqual(refreshTokenRole, ROLES.EMPLOYEE);

});

Then('the user should receive an error response', function () {
    // Check if the response status is 400
    assert.deepStrictEqual(this.response.status, 400);

    // Check if the response body contains an error message
    assert.ok(this.response.body.error);

    
});

Then('the respose should indicate that the credentials are invalid', function () {
    // Check if the error message is 'Invalid credentials'
    assert.strictEqual(this.response.body.error, new InvalidCredentialsError().message);
});

Then('the response should indicate that username does not exists and password does not exists', function () {
    assert.strictEqual(this.response.body.error, "Nama pengguna tidak boleh kosong!, Kata sandi tidak boleh kosong!");
});

Then('the response should indicate that username exists and password does not exists', function () {
    assert.strictEqual(this.response.body.error, "Kata sandi tidak boleh kosong!");
});

Then('the response should indicate that username does not exists and password exists', function () {
    assert.strictEqual(this.response.body.error, "Nama pengguna tidak boleh kosong!");
});
