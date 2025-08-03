import { Given } from "@cucumber/cucumber";
import { generateTokens } from "../../../src/utils/jwt.js";
import { Roles } from "../../../src/constants/role.js";

Given('pengguna tidak punya token akses', function () {
    this.token = "";
});

Given('Authorization header tidak valid', function () {
    this.authHeader = this.token;
});

Given('pengguna punya token akses', function () {
    const { accessToken } = generateTokens(Roles.Owner);
    this.token = accessToken;
});

Given('Authorization header valid', function () {
    this.authHeader = `Bearer ${this.token}`;
});

Given('pengguna adalah pemilik', function () {
    const { accessToken } = generateTokens(Roles.Owner);
    this.authHeader = `Bearer ${accessToken}`;
});

Given('pengguna adalah pegawai', function () {
    const { accessToken } = generateTokens(Roles.Employee);
    this.authHeader = `Bearer ${accessToken}`;
});