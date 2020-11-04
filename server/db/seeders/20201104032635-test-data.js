"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Demo",
          email: "demo@email.com",
          hashed_password: bcrypt.hashSync("password"),
          name: "Demo User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
