import { Given } from "@cucumber/cucumber";
import Cake from "../../../src/domain/models/cake.model.js";
import { v4 as uuidv4 } from 'uuid';

Given('id kue valid', function () {
    this.cakeId = uuidv4();
});

Given('id kue tidak valid', function () {
    this.cakeId = "invalid-uuid";
});

Given('nama kue {string}', function (name) {
    this.reqBody = { name };
});

Given('harga {string}', function (price) {
    if (price.length > 0) {
        this.reqBody.price = parseInt(price);
    }
});

Given('kue dengan nama {string} dan harga {int} telah ditambahkan', async function (name, price) {
    const cake = await Cake.create({ id: this.cakeId, name, price });
});