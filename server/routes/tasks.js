const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Task, Comment } = require("../db/models");
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

//create comment for task
router.post(
  "/:id/comment",
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const { text, user_id } = req.body;
    const comment = await Comment.create({
      text: text,
      task_id: task_id,
      user_id: user_id,
    });
    if (!comment) {
      res.status(404);
    } else {
      res.status(201);
    }
  })
);

//get all comments for task
router.get(
  "/:id/comment",
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const comments = await Comment.findAll({
      where: {
        task_id: task_id,
      },
    });
    res.json(comments);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const { name, due_date, description, completed } = req.body;
    try {
      const updateTask = await Task.update(
        {
          name: name,
          due_date: due_date,
          description: description,
          completed: completed,
        },
        {
          where: {
            id: task_id,
          },
        }
      );
      console.log("confirm");
      res.json(updateTask);
    } catch (err) {
      res.status(401).send({ error: "Something went wrong" });
    }
  })
);

//Delete Task
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;

    const task = await Task.delete({
      where: { id: task_id },
    });
    res.json(202);
  })
);

module.exports = router;
