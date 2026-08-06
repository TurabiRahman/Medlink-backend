const express = require("express");

const router = express.Router();

const authenticate  = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");

const { profileSchema, updateProfileSchema } = require("../validations/user.validation");

const { completeProfile, getProfile, updateProfile } = require("../controllers/user.controller");

router.post(
    "/profile",
    authenticate,
    validate(profileSchema),
    completeProfile
);

router.get(
    "/profile",
    authenticate,
    getProfile
);

router.put(
    "/profile",
    authenticate,
    validate(updateProfileSchema),
    updateProfile
);

module.exports = router;