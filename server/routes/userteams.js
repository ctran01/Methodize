const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { UserTeam } = require("../db/models");

const router = express.Router();

//get all userteams
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const userteams = await UserTeam.findAll({});
    res.json(userteams);
  })
);

module.export = router;
