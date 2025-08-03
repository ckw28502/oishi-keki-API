import { Then } from "@cucumber/cucumber";
import assert from "assert";

Then('the response status should be {int}', function (int) {
    assert.deepStrictEqual(this.response.status, int);
});

Then('the response message should be {string}', function (string) {
    assert.deepStrictEqual(this.response.body.message, string);
});