import { Given, When } from "@cucumber/cucumber";
import { Methods, sendRequest } from "../../common/helper.js";
import { Roles } from "../../../../src/constants/role.js";
import { generateTokens } from "../../../../src/utils/jwt.js";

Given('pengguna akan membuat ulang token dengan pemilik', function () {
    const { refreshToken } = generateTokens(Roles.Owner);
    this.authHeader = `Bearer ${refreshToken}`;
});

Given('pengguna akan membuat ulang token dengan pegawai', function () {
    const { refreshToken } = generateTokens(Roles.Employee);
    this.authHeader = `Bearer ${refreshToken}`;
});

When('pengguna mengirimkan permintaan untuk buat ulang token', async function () {
    this.response = await sendRequest("/api/v1/auths/refresh", Methods.Post, null, this.authHeader);
});