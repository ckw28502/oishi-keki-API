import { v4 as uuidv4 } from "uuid";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("cakes", [
    {
      id: uuidv4(),
      name: "Chiffon cake",
      price: 150000
    },
    {
      id: uuidv4(),
      name: "Chocolate cake",
      price: 100000
    }
  ], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("cakes", null, {});
}
