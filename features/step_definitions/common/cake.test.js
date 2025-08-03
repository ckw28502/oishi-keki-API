import { Given } from "@cucumber/cucumber";
import { Methods, sendRequest } from "./helper.js";

Given('kue dengan nama {string} dan harga {int} telah ditambahkan', async function (string, int) {
    this.response = await sendRequest("/api/v1/cakes", Methods.Post, this.reqBody, this.authHeader);
});