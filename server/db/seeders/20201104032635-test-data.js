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
        {
          email: "engineering@email.com",
          hashed_password: bcrypt.hashSync("password"),
          name: "Engineering User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "marketing@email.com",
          hashed_password: bcrypt.hashSync("password"),
          name: "Marketing User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "sales@email.com",
          hashed_password: bcrypt.hashSync("password"),
          name: "Sales User",
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
        {
          name: "Marketing",
          description: "This is the marketing team",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sales",
          description: "This is the marketing team",
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
        {
          user_id: 3,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          team_id: 3,
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
          owner_id: 3,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bug Tracking",
          owner_id: 3,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Web Application",
          owner_id: 3,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "UI/UX Project",
          owner_id: 3,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cloud Storage Project",
          owner_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marketing Booklet",
          owner_id: 4,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "SEO Campaign",
          owner_id: 4,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Online Marketing",
          owner_id: 4,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sales Project",
          owner_id: 5,
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Catalina Wine Mixer",
          owner_id: 5,
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "International Sales",
          owner_id: 5,
          team_id: 3,
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
          owner_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 1,
          owner_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Completed",
          project_id: 1,
          owner_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "To Do",
          project_id: 2,
          owner_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 2,
          owner_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Completed",
          project_id: 2,
          owner_id: 4,
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
          due_date: new Date("2021-08-13"),
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
          due_date: "2021-08-13",
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Create Pamphlet",
          tasklist_id: 1,
          project_id: 7,
          assignee_id: 1,
          description: "create marketing pamphlets",
          due_date: "2020-12-30",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Discuss marketing strategy",
          tasklist_id: 1,
          project_id: 7,
          assignee_id: 1,
          description: "discuss marketing strategy",
          due_date: "2021-08-13",
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Meet with client",
          tasklist_id: 1,
          project_id: 11,
          assignee_id: 1,
          description: "Meet with client",
          due_date: "2020-12-13",
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
