const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Task, Comment, Project, User } = require("../db/models");
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
      include: [{ model: Project }],
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
      res.json(comment).status(201);
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
      include: [{ model: User, attributes: ["id", "name", "email", "image"] }],
      order: [["id", "ASC"]],
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
      include: [
        {
          model: Project,
          include: {
            model: User,
            attributes: ["id", "name", "email", "image"],
          },
        },
        { model: User, attributes: ["id", "name", "email", "image"] },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["id", "name", "email", "image"],
          },
        },
      ],
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

//update project
router.put(
  `/:id/project/:projectId`,
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const project_id = req.params.projectId;
    try {
      const updateTask = await Task.update(
        {
          project_id: project_id,
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
      res.send({ error: "Something went wrong" });
    }
  })
);

//update Assignee
router.put(
  `/:id/assignee/:assigneeId`,
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const assignee_id = req.params.assigneeId;
    try {
      const updateTask = await Task.update(
        {
          assignee_id: assignee_id,
        },
        {
          where: {
            id: task_id,
          },
        }
      );
      const task = await Task.findOne({
        where: {
          id: task_id,
        },
        include: [
          { model: Project },
          { model: User, attributes: ["id", "name", "email", "image"] },
        ],
      });
      res.json(task);
    } catch (err) {
      res.send({ error: "Something went wrong" });
    }
  })
);

//update due date
router.put(
  `/:id/dueDate`,
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const { date } = req.body;
    try {
      const updateTask = await Task.update(
        {
          due_date: date,
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
      res.send({ error: "Something went wrong" });
    }
  })
);

//update description
router.put(
  `/:id/description`,
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const { description } = req.body;
    try {
      const updateTask = await Task.update(
        {
          description: description,
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
      res.send({ error: "Something went wrong" });
    }
  })
);

//update complete
router.put(
  `/:id/complete`,
  asyncHandler(async (req, res, next) => {
    const task_id = req.params.id;
    const { completed } = req.body;
    try {
      const updateTask = await Task.update(
        {
          completed: completed,
        },
        {
          where: {
            id: task_id,
          },
        }
      );
      const task = await Task.findOne({
        where: {
          id: task_id,
        },
        include: [
          {
            model: Project,
            include: {
              model: User,
              attributes: ["id", "name", "email", "image"],
            },
          },
          { model: User, attributes: ["id", "name", "email", "image"] },
          {
            model: Comment,
            include: {
              model: User,
              attributes: ["id", "name", "email", "image"],
            },
          },
        ],
      });
      res.json(task);
    } catch (err) {
      res.send({ error: "Something went wrong" });
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
