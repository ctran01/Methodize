const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth, getUserToken } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const {
  Project,
  User,
  TaskList,
  Team,
  UserProject,
  Task,
} = require("../../db/models");

const router = express.Router();
//Authenticates user before being able to use API
// router.use(requireAuth);

//get all projects
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const projects = await Project.findAll({});

    res.json(projects);
  })
);

//Get all projects for a user
// router.get(
//   "/user/:id",
//   asyncHandler(async (req, res, next) => {
//     const user_id = req.params.id;
//     const projects = await Project.findAll({
//       include: [
//         {
//           model: User,
//           where: {
//             id: user_id,
//           },
//           attributes: ["name"],
//         },
//       ],
//     });
//     res.json(projects);
//     //  select * from Projects where user_id = id from projects join team on projects.team_id = team.id join user_team
//   })
// );

//get all projects for teams that a user is on

router.get(
  "/user/:id",
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.id;
    const projects = await Team.findAll({
      include: [
        {
          model: User,
          where: {
            id: user_id,
          },
          attributes: ["name"],
        },
        { model: Project },
      ],
    });

    let combinedProjects = projects.map((team) => {
      return team.Projects;
    });
    //pulls all projects from teams and combines into an array
    let arrays = [];
    for (i = 0; i < combinedProjects.length; i++) {
      for (j = 0; j < combinedProjects[i].length; j++) {
        arrays.push(combinedProjects[i][j]);
      }
    }
    //Sorts by created date
    arrays.sort(function (a, b) {
      var keyA = new Date(a.createdAt),
        keyB = new Date(b.createdAt);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    res.json(arrays);
  })
);

//get all users in a project
router.get(
  "/:id/users",
  asyncHandler(async (req, res, next) => {
    const project_id = req.params.id;

    const users = await User.findAll({
      include: [
        {
          model: Project,
          where: { id: project_id },
        },
      ],

      attributes: ["id", "name"],
    });
    res.json(users);
  })
);

//get all taskslists for a project
router.get(
  "/:id/tasklists",
  asyncHandler(async (req, res, next) => {
    const project_id = req.params.id;
    const tasklist = await TaskList.findAll({
      where: {
        project_id: project_id,
      },
      order: [["column_index", "ASC"]],
      include: [
        {
          model: Task,
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
      ],
    });
    if (!tasklist) {
      res.json({ message: "error" });
    }
    res.json(tasklist);
  })
);

//get team project is on
router.get(
  "/:id/team",
  asyncHandler(async (req, res, next) => {
    const project_id = req.params.id;
    const team = await Team.findOne({
      include: [
        { model: Project, where: { id: project_id } },
        { model: User, attributes: ["name", "id"] },
      ],
    });
    res.json(team);
  })
);
//Create tasklist for project
router.post(
  "/:id/tasklist",
  asyncHandler(async (req, res, next) => {
    const project_id = req.params.id;
    const { name, userId } = req.body;

    const tasklist = await TaskList.create({
      name: name,
      owner_id: userId,
      project_id: project_id,
    });
    res.json(tasklist).status(201);
  })
);

//Delete project
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.id;
    const project_id = req.params.projectId;
    const project = await Project.delete({
      where: { id: project_id },
    });
    res.status(202);
  })
);

//get everything about project

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.userId;
    const project_name = req.params.projectName;
    const project_id = req.params.id;
    // const project = await Project.findOne({
    //   include: [
    //     {
    //       model: User,
    //       where: {
    //         id: user_id,
    //       },
    //       attributes: ["name"],
    //     },
    //     { model: TaskList },
    //   ],
    //   where: {
    //     name: project_name,
    //   },
    // });

    const project = await Project.findOne({
      include: [
        {
          model: TaskList,
        },
        // { model: Team },
        // { model: User, attributes: ["name", "email", "id"] },
      ],
      where: {
        id: project_id,
      },
    });

    res.json(project);
  })
);

module.exports = router;
