import { After } from "@cucumber/cucumber";
import Cake from "../../../src/domain/models/cake.model.js";

After({ tags: "@cake" }, async function () {
    await Cake.destroy({ where: {}, truncate: true, force: true });
});