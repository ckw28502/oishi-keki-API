import { Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { Methods, sendRequest } from "../../common/helper.js";


When('pengguna mengirimkan permintaan untuk mendapatkan kue berdasarkan ID', async function () {
    this.response = await sendRequest(`/api/v1/cakes/${this.cakeId}`, Methods.Get, null, this.authHeader);
});

Then('respons harus berisi data kue dengan nama {string} dan harga {int}', function (name, price) {
    const responseBody = this.response.body;
    assert.ok(responseBody);
    assert.strictEqual(responseBody.id, this.cakeId);
    assert.strictEqual(responseBody.name, name);
    assert.strictEqual(responseBody.price, price);
});