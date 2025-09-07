import { Given, When } from "@cucumber/cucumber";
import { Methods, sendRequest } from "../../common/helper.js";

Given('nama kue yang baru adalah {string}', function (string) {
    this.reqBody = { name: string };
});

Given('harga yang baru adalah {string}', function (price) {
    if (price.length > 0) {
        this.reqBody.price = parseInt(price);
    }
});

When('pengguna mengirimkan permintaan untuk mengubah data kue', async function () {
    this.response = await sendRequest(`/api/v1/cakes/${this.cakeId}`, Methods.Put, this.reqBody, this.authHeader);
});