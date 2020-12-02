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

          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mobile Application",

          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Web Application",

          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "UI/UX Project",

          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "SEO Campaign",

          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Online Marketing",

          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Catalina Wine Mixer",

          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "International Sales",

          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const userProject = await queryInterface.bulkInsert(
      "UserProjects",
      [
        {
          user_id: 1,
          project_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          project_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          project_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          project_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          project_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          project_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          project_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          project_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          project_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          project_id: 8,
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
        {
          name: "Completed",
          project_id: 1,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "To Do",
          project_id: 6,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 6,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Completed",
          project_id: 6,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "To Do",
          project_id: 8,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 8,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Completed",
          project_id: 8,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "To Do",
          project_id: 7,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 7,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Completed",
          project_id: 7,
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
          tasklist_id: 4,
          project_id: 6,
          assignee_id: 1,
          description: "create marketing pamphlets",
          due_date: "2020-12-30",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Discuss marketing strategy",
          tasklist_id: 4,
          project_id: 6,
          assignee_id: 1,
          description: "discuss marketing strategy",
          due_date: "2021-08-13",
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Meet with client",
          tasklist_id: 10,
          project_id: 7,
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
    await queryInterface.bulkDelete("UserProjects", null, {});
    await queryInterface.bulkDelete("TaskLists", null, {});
    await queryInterface.bulkDelete("Tasks", null, {});
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
