"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@email.com",
          hashed_password: bcrypt.hashSync("password"),
          name: "Demo User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test@email.com",
          hashed_password: bcrypt.hashSync("password"),
          name: "Test User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const teams = await queryInterface.bulkInsert(
      "Teams",
      [
        {
          name: "Engineering",
          description: "This is the engineering team",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const userteams = await queryInterface.bulkInsert(
      "UserTeams",
      [
        {
          user_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const projects = await queryInterface.bulkInsert(
      "Projects",
      [
        {
          name: "Database Project",
          owner_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mobile Application",
          owner_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bug Tracking",
          owner_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Engineering Project Plan",
          owner_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Web Application",
          owner_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Short Term Project",
          owner_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const tasklists = await queryInterface.bulkInsert(
      "TaskLists",
      [
        {
          name: "To Do",
          project_id: 1,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 1,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const tasks = await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          name: "Create schema",
          tasklist_id: 1,
          project_id: 1,
          assignee_id: 1,
          description: "create initial database schema",
          due_date: new Date("2020-08-13"),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Create Models",
          tasklist_id: 1,
          project_id: 1,
          assignee_id: 1,
          description: "create models",
          due_date: "2020-08-13",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const comments = await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "I'll work on this soon",
          task_id: 1,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Teams", null, {});
    await queryInterface.bulkDelete("UserTeams", null, {});
    await queryInterface.bulkDelete("Projects", null, {});
    await queryInterface.bulkDelete("TaskLists", null, {});
    await queryInterface.bulkDelete("Tasks", null, {});
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
