const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Team, UserTeam, User, Project } = require("../db/models");
const router = express.Router();

//Gets all Teams
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const teams = await Team.findAll({});

    res.json(teams);
  })
);

//get all users in a Team
router.get(
  "/:id/users",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.id;

    const users = await Team.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      where: { id: team_id },
    });

    res.json(users);
  })
);

//get All teams for a user
router.get(
  "/user/:id",
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.id;

    const teams = await User.findAll({
      include: [{ model: Team }],
      where: {
        id: user_id,
      },
      attributes: ["name"],
    });

    res.json(teams);
  })
);

//Create Project for team
router.post(
  "/:id/project",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.id;
    const { name, owner_id } = req.body;
    const project = await Project.create({});
  })
);
module.exports = router;
