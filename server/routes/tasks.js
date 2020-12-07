const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Task, Comment } = require("../db/models");
const comment = require("../db/models/comment");

const router = express.Router();
//Authenticates user before being able to use API
// router.use(requireAuth);

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

router.get(
  `/:id`,
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const task = await Task.findOne({
      where: {
        id: task_id,
      },
    });
    res.json(task);
  })
);

//updates tasklist
router.put(
  `/:id/tasklist`,
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const { destinationTasklistId } = req.body;
    try {
      const updateTasklist = await Task.update(
        {
          tasklist_id: destinationTasklistId,
        },
        {
          where: {
            id: task_id,
          },
        }
      );
      const task = await Task.findOne({ where: { id: task_id } });
      res.json(task);
    } catch (err) {
      res.status(401).send({ error: "Something went wrong" });
    }
  })
);

//updates taskindex
router.put(
  `/:id/taskindex`,
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const { destinationIndex } = req.body;
    try {
      const updateTaskIndex = await Task.update(
        {
          task_index: destinationIndex,
        },
        {
          where: {
            id: task_id,
          },
        }
      );
      const task = await Task.findOne({ where: { id: task_id } });
      res.json(task);
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

    const task = await Task.destroy({
      where: { id: task_id },
    });
    res.json(202);
  })
);

module.exports = router;
