const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { TaskList, Task } = require("../db/models");
const router = express.Router();

//get all tasklists
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const tasklists = await TaskList.findAll({});

    res.json(tasklists);
  })
);

//get all tasks for tasklist

router.get(
  "/:id/tasks",
  asyncHandler(async (req, res, next) => {
    const tasklist_id = req.params.id;
    const tasks = await Task.findAll({
      where: {
        tasklist_id: tasklist_id,
      },
    });
    res.json(tasks);
  })
);

//Post task to tasklist
router.post(
  "/:id/task",
  asyncHandler(async (req, res, next) => {
    const tasklist_id = req.params.id;
    const {
      description,
      due_date,
      completed,
      completed_at,
      project_id,
      user_id,
    } = req.body;
    const task = await Task.create({
      user_id,
      description,
      due_date,
      completed,
      completed_at,
      project_id,
    });
    if (!task) {
      res.status(404);
    } else {
      res.status(201);
    }
  })
);
module.exports = router;
