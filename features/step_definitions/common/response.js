import { Then } from "@cucumber/cucumber";
import assert from "assert";


Then('status respons harus {int}', function (status) {
    assert.deepStrictEqual(this.response.status, status);
});

Then('pesan respons harus {string}', function (message) {
    assert.deepStrictEqual(this.response.body.message, message);
});