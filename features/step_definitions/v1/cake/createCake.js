import { Given, When } from "@cucumber/cucumber";
import { Methods, sendRequest } from "../../common/helper.js";

Given('nama kue {string}', function (name) {
    this.reqBody = { name };
});

Given('harga {string}', function (price) {
    if (price.length > 0) {
        this.reqBody.price = parseInt(price);
    }
});

When('pengguna mengirimkan permintaan untuk membuat kue', async function () {
    this.response = await sendRequest("/api/v1/cakes", Methods.Post, this.reqBody, this.authHeader);
});
