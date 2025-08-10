import { After } from "@cucumber/cucumber";
import Cake from "../../../src/models/cake.js";

After({ tags: "@cake" }, async function () {
    await Cake.destroy({ where: {}, truncate: true });
});