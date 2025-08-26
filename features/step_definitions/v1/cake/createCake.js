import { Given, When, Then } from "@cucumber/cucumber";
import { Methods, sendRequest } from "../../common/helper.js";
import Cake from "../../../../src/domain/models/cake.model.js";


Given('nama kue {string}', function (name) {
    this.reqBody = { name };
});

Given('harga {string}', function (price) {
    if (price.length > 0) {
        this.reqBody.price = parseInt(price);
    }
});

Given('kue dengan nama {string} dan harga {int} telah ditambahkan', async function (name, price) {
    await Cake.create({ name, price });
});

When('pengguna mengirimkan permintaan untuk membuat kue', async function () {
    this.response = await sendRequest("/api/v1/cakes", Methods.Post, this.reqBody, this.authHeader);
});
