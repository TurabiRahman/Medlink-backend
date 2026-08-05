const express = require("express");

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { signupSchema } = require("../validations/auth.validation");

const router = express.Router();

router.post(
  "/signup",
  validate(signupSchema),
  authController.signup
);

module.exports = router;