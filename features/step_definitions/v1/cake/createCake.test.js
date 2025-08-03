import { Given, Then, When } from "@cucumber/cucumber";
import { Methods, sendRequest } from "../../common/helper.js";
import assert from "assert";


Given('the user have no access token', function () {
    this.authHeader = "";
});

When('the user send create cake request', async function () {
    this.response = await sendRequest("/api/v1/cakes", Methods.Post, this.reqBody, this.authHeader);
});