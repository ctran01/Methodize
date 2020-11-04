const express = require("express");
const bcrypt = require("bcryptjs");
const { asyncHandler } = require("./utilities/utils");
const { check, validationResult } = require("express-validator");
const { User } = require("../db/models");

const router = express.Router();

validateUserFields = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valide password"),
];

const validateEmailPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password"),
];

//get all users
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.findAll({});

    res.json(users);
  })
);

module.exports = router;
