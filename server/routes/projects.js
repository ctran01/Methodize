const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Project } = require("../db/models");

const router = express.Router();

//get all projects
router.get(
  "/",
  asyncHandler(async (req, res, enxt) => {
    const projects = await Project.findAll({});

    res.json(projects);
  })
);

module.export = router;
