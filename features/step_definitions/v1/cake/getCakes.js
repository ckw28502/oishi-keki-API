import { Given, Then, When } from '@cucumber/cucumber';
import { Methods, sendRequest } from '../../common/helper.js';
import Cake from '../../../../src/domain/models/cake.model.js';
import assert from 'assert';


Given('kue-kue di bawah telah terdaftar di basis data:', async function (cakes) {
    this.cakes = (await Cake.bulkCreate(cakes.hashes())).map(cake => cake.get({ plain: true }));
});

Given('halaman yang ke-{int}', function (page) {
    this.params = { page };
});

Given('jumlah kue per halaman adalah {int}', function (limit) {
    this.params.limit = limit;
});

Given('filter nama kue berisi {string}', function (nameFilter) {
    this.params.nameFilter = nameFilter;
});

Given('parameter untuk mengurutkan adalah {string}', function (sortParam) {
    this.params.sort = sortParam;
});

Given('urutan ASC', function () {
    this.params.sort += "_asc";
});

Given('urutan DESC', function () {
    this.params.sort += "_desc";
});

When('pengguna mengirimkan permintaan untuk mendapatkan daftar kue', async function () {
    this.response = await sendRequest("/api/v1/cakes", Methods.Get, this.params, this.authHeader);
});

Then('jumlah halaman adalah {int}', function (totalPages) {
    this.responseBody = this.response.body;
    assert.ok(this.responseBody);
    assert.strictEqual(this.responseBody.totalPages, totalPages);
});

Then('jumlah kue adalah {int}', function (cakeCount) {
    assert.strictEqual(this.responseBody.count, cakeCount);
});

Then('daftar kue yang didapat adalah {string}', function (expectedCakesStr) {
    let expectedCakes = [];

    // If list of cakes return cakes, split the name and get the list of cakeDTO
    if (expectedCakesStr) {
        const expectedCakeNames = expectedCakesStr.split(", ");
        expectedCakes = expectedCakeNames.map(name => {
            const cake = this.cakes.find(cake => cake.name === name);
            return {
                id: cake.id,
                name: cake.name,
                price: cake.price
            }
        });
    }
    
    assert.deepStrictEqual(this.responseBody.cakes, expectedCakes);
});