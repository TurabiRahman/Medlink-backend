const express = require("express");

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { signupSchema, loginSchema, emergencyLoginSchema, forgotPasswordSchema, resetPasswordSchema } = require("../validations/auth.validation");

const authenticate = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/signup",
  validate(signupSchema),
  authController.signup
);

router.post(    ///http://localhost:3000/api/v1/auth/login
    "/login",
    validate(loginSchema),
    authController.login
);

router.post(
    "/emergency-login",
    validate(emergencyLoginSchema),
    authController.startEmergencySession
);

router.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    authController.forgotPassword
);

router.post(
    "/reset-password",
    validate(resetPasswordSchema),
    authController.resetPassword
);

router.post(
    "/logout",
    authenticate,
    authController.logout
);

module.exports = router;