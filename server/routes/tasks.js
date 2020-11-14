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

//get all tasks for user
router.get(
  "/user/:id",
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.id;
    const tasks = await Task.findAll({
      where: {
        assignee_id: user_id,
      },
    });
    res.json(tasks);
  })
);

module.exports = router;
