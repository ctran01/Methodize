const express = require("express");
const bcrypt = require("bcryptjs");
const { asyncHandler } = require("./utilities/utils");
const { check, validationResult } = require("express-validator");
const { User } = require("../db/models");

const router = express.Router();

validateUserFields = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valide password"),
];

validateName[
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("You'll need to enter a name")
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

router.post(
  "/register",
  validateUserFields,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        email: email,
        hashed_password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const token = getUserToken(user);
      res.status(200).json({
        id: user.id,
        token,
        email: user.email,
      });
    } catch (err) {
      res.status(422).send(err.message);
    }
  })
);

router.put(
  "/register/onboard",
  validateName,
  asyncHandler(async (req, res) => {
    const { name, email, teamName } = req.body;
    try {
      if (teamName) {
        const user = await User.update(
          { name: name },
          {
            where: {
              email: email,
            },
          }
        );
      } else if (!teamName) {
      }
    } catch (err) {
      res.status(422).send(err.message);
    }
  })
);

//Log in

router.post(
  "/signin",
  asyncHandler(async (req, res) => {})
);

module.exports = router;
