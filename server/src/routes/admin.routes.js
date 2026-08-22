const express = require("express");

const authenticate = require(
    "../middlewares/auth.middleware"
);

const authorize = require(
    "../middlewares/authorize.middleware"
);

const validate = require(
    "../middlewares/validate.middleware"
);

const {
    getAllUsers,
    updateUserRole,
    updateUserStatus,
} = require("../controllers/admin.controller");

const {
    updateUserRoleSchema,
    updateUserStatusSchema,
} = require("../validations/admin.validation");

const router = express.Router();

// ============================================================
// USER MANAGEMENT
// ============================================================

// GET /api/v1/admin/users
router.get(
    "/users",
    authenticate,
    authorize("SUPER_ADMIN"),
    getAllUsers
);


// PUT /api/v1/admin/users/:userId/role
router.put(
    "/users/:userId/role",
    authenticate,
    authorize("SUPER_ADMIN"),
    validate(updateUserRoleSchema),
    updateUserRole
);


// PUT /api/v1/admin/users/:userId/status
router.put(
    "/users/:userId/status",
    authenticate,
    authorize("SUPER_ADMIN"),
    validate(updateUserStatusSchema),
    updateUserStatus
);

module.exports = router;