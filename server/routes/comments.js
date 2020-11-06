const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Comment } = require("../db/models");

const router = express.Router();

//get all comments
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const comments = await Comment.findAll({});

    res.json(comments);
  })
);

module.export = router;
