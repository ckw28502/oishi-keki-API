import { Given, When, Then } from '@cucumber/cucumber';
import jwt from 'jsonwebtoken';
import { Roles } from '../../../../src/constants/role.js';
import assert from 'assert';
import { randomBytes } from 'crypto';
import { Methods, sendRequest } from '../../common/helper.js';

const generateRandomString = () => {
    return randomBytes(32).toString("hex");
}

Given('pengguna memiliki nama pengguna dan kata sandi yang valid untuk pemilik', function () {
    this.reqBody = {
        username: process.env.OWNER_USER,
        password: process.env.OWNER_PASSWORD
    };
});

Given('pengguna memiliki nama pengguna dan kata sandi yang valid untuk pegawai', function () {
    this.reqBody = {
        username: process.env.EMPLOYEE_USER,
        password: process.env.EMPLOYEE_PASSWORD
    };
});

Given('pengguna memiliki nama pengguna atau kata sandi yang tidak valid', function () {
    this.reqBody = {
        username: generateRandomString(),
        password: generateRandomString()
    };
})

Given('nama pengguna {string}', function (string) {
    this.reqBody = { username: string };
});

Given('kata sandi {string}', function (string) {
    this.reqBody.password = string;
});

When('pengguna mencoba untuk login', async function () {
    this.response = await sendRequest("/api/v1/auths/login", Methods.Post, this.reqBody);
});

const checkJwtRole = (responseBody, role) => {
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
    assert.strictEqual(accessTokenRole, role);

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
    assert.strictEqual(refreshTokenRole, role);
}

Then('respons harus berisi token JWT dengan izin pemilik', function () {
    checkJwtRole(this.response.body, Roles.Owner);
});

Then('respons harus berisi token JWT dengan izin pegawai', function () {
    checkJwtRole(this.response.body, Roles.Employee);
});
