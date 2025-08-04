import { Given, Then, When } from "@cucumber/cucumber";
import { Methods, sendRequest } from "../../common/helper.js";
import assert from "assert";
import Cake from "../../../../src/models/cake.js";

Given('nama kue {string}', function (string) {
    this.reqBody = { name: string };
});

Given('harga {string}', function (string) {
    if (string.length > 0) {
        this.reqBody.price = parseInt(string);
    }
});

Given('kue dengan nama {string} dan harga {int} telah ditambahkan', async function (string, int) {
    await Cake.create({ name: string, price: int });
});

When('pengguna mengirimkan permintaan untuk membuat kue', async function () {
    this.response = await sendRequest("/api/v1/cakes", Methods.Post, this.reqBody, this.authHeader);
});