const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Task } = require("../db/models");
const router = express.Router();

//get all tasks
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const tasks = await Task.findAll({});

    res.json(tasks);
  })
);

module.export = router;
