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
    },
    {
      id: uuidv4(),
      name: "Strawberry cake",
      price: 145000
    },
    {
      id: uuidv4(),
      name: "Rainbow cake",
      price: 125000
    },
    {
      id: uuidv4(),
      name: "Matcha cake",
      price: 160000
    },
    {
      id: uuidv4(),
      name: "Cheese cake",
      price: 140000
    },
    {
      id: uuidv4(),
      name: "Red velvet cake",
      price: 170000
    },
    {
      id: uuidv4(),
      name: "Marble cake",
      price: 135000
    },
    {
      id: uuidv4(),
      name: "Blackforest cake",
      price: 180000
    },
    {
      id: uuidv4(),
      name: "Indomie cake",
      price: 100000
    },
  ], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("cakes", null, {});
}
