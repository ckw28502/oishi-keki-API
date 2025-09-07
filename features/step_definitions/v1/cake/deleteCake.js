import { When } from "@cucumber/cucumber";
import { Methods, sendRequest } from "../../common/helper.js";

When('pengguna mengirimkan permintaan untuk menghapus kue', async function () {
    this.response = await sendRequest(`/api/v1/cakes/${this.cakeId}`, Methods.Delete, null, this.authHeader);
});