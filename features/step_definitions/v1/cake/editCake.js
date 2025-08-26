import { Given } from "@cucumber/cucumber";
import { Methods, sendRequest } from "../../common/helper.js";

Given('pengguna mengirimkan permintaan untuk mengubah data kue', async function () {
    this.response = await sendRequest(`/api/v1/cakes/${this.cakeId}`, Methods.Put, this.reqBody, this.authHeader);
});