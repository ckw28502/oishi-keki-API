import { Then } from "@cucumber/cucumber";
import assert from "assert";


Then('status respons harus {int}', function (int) {
    assert.deepStrictEqual(this.response.status, int);
});

Then('pesan respons harus {string}', function (string) {
    assert.deepStrictEqual(this.response.body.message, string);
});