import { Given, When, Then } from '@cucumber/cucumber';
import jwt from 'jsonwebtoken';
import { Roles } from '../../../../src/constants/role.js';
import assert from 'assert';
import { randomBytes } from 'crypto';
import { Methods, sendRequest } from '../../common/helper.js';

const generateRandomString = () => {
    return randomBytes(32).toString("hex");
}

Given('the user has a valid email and password for owner', function () {
    this.reqBody = {
        username: process.env.OWNER_USER,
        password: process.env.OWNER_PASSWORD
    };
});

Given('the user has a valid email and password for employee', function () {
    this.reqBody = {
        username: process.env.EMPLOYEE_USER,
        password: process.env.EMPLOYEE_PASSWORD
    };
});

Given('the user has an invalid email or password', function () {
    this.reqBody = {
        username: generateRandomString(),
        password: generateRandomString()
    };
})

Given('the username does not exists and password does not exists', function () {
    this.reqBody = {};
});

Given('the username exists and password does not exists', function () {
    this.reqBody = {
        username: process.env.OWNER_USER
    };
});

Given('the username does not exists and password exists', function () {
    this.reqBody = {
        password: process.env.OWNER_PASSWORD
    };
});

When('the user attempts to log in', async function () {
    this.response = await sendRequest("/api/v1/auths/login", Methods.Post, this.reqBody);
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
    assert.strictEqual(accessTokenRole, Roles.Owner);

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
    assert.strictEqual(refreshTokenRole, Roles.Owner);

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
    assert.strictEqual(accessTokenRole, Roles.Employee);

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
    assert.strictEqual(refreshTokenRole, Roles.Employee);

});

Then('the response should indicate that username does not exists and password does not exists', function () {
    assert.strictEqual(this.response.body.message, "Nama pengguna tidak boleh kosong!, Kata sandi tidak boleh kosong!");
});

Then('the response should indicate that username exists and password does not exists', function () {
    assert.strictEqual(this.response.body.message, "Kata sandi tidak boleh kosong!");
});

Then('the response should indicate that username does not exists and password exists', function () {
    assert.strictEqual(this.response.body.message, "Nama pengguna tidak boleh kosong!");
});
