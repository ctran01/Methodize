const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth, getUserToken } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Project, User } = require("../db/models");

const router = express.Router();

//get all projects
router.get(
  "/",
  asyncHandler(async (req, res, enxt) => {
    const projects = await Project.findAll({});

    res.json(projects);
  })
);

router.get(
  "/user/:id",
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.id;
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          where: {
            id: user_id,
          },
        },
      ],
    });
    res.json(projects);
    //  select * from Projects where user_id = id from projects join team on projects.team_id = team.id join user_team
  })
);

module.exports = router;
