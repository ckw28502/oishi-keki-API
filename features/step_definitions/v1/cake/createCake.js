import { When } from "@cucumber/cucumber";
import { Methods, sendRequest } from "../../common/helper.js";


When('pengguna mengirimkan permintaan untuk membuat kue', async function () {
    this.response = await sendRequest("/api/v1/cakes", Methods.Post, this.reqBody, this.authHeader);
});
