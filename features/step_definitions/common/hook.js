import { AfterAll } from "@cucumber/cucumber";
import Cake from "../../../src/models/cake.js";

AfterAll(async function () {
    await Cake.destroy({ where: {}, truncate: true });
})