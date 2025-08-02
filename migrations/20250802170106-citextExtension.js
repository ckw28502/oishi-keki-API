"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("CREATE EXTENSION IF NOT EXISTS citext");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("DROP EXTENSION IF EXISTS citext");
  }
};
