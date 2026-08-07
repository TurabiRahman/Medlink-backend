const express = require("express");

const router = express.Router();

const authenticate  = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");

const { profileSchema, 
        updateProfileSchema,
        roleSchema
     } = require("../validations/user.validation");

const { completeProfile, 
        getProfile, 
        updateProfile, 
        getUserDetails, 
        getAllUsers, 
        updateRole,
        deleteUserAccount
    } = require("../controllers/user.controller");

const authorize = require("../middlewares/authorize.middleware");


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

router.get(
    "/all",
    authenticate,
    authorize("SUPER_ADMIN"),
    getAllUsers
);

router.get(
    "/:userId",
    authenticate,
    authorize("SUPER_ADMIN"),
    getUserDetails
);

router.put(
    "/:userId/role",
    authenticate,
    authorize("SUPER_ADMIN"),
    validate(roleSchema),
    updateRole
);

router.delete(
    "/:userId",
    authenticate,
    authorize("CUSTOMER", "SUPER_ADMIN"),
    deleteUserAccount
);

module.exports = router;