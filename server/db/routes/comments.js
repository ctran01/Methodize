const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Comment } = require("../db/models");

const router = express.Router();

//Authenticates user before being able to use API
// router.use(requireAuth);

//get all comments
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const comments = await Comment.findAll({});

    res.json(comments);
  })
);

//Delete Comment
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const comment_id = req.params.id;

    const comment = await Comment.delete({
      where: { id: comment_id },
    });
    res.json(202);
  })
);

module.exports = router;
