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

    getAllHospitals,
    getHospitalById,
    createHospital,
    updateHospital,
    deleteHospital
} = require("../controllers/admin.controller");

const {
    updateUserRoleSchema,
    updateUserStatusSchema,
    createHospitalSchema,
    updateHospitalSchema
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

// ============================================================
// HOSPITAL MANAGEMENT
// ============================================================

// GET /api/v1/admin/hospitals
router.get(
    "/hospitals",
    authenticate,
    authorize("SUPER_ADMIN"),
    getAllHospitals
);


// GET /api/v1/admin/hospitals/:hospitalId
router.get(
    "/hospitals/:hospitalId",
    authenticate,
    authorize("SUPER_ADMIN"),
    getHospitalById
);


// POST /api/v1/admin/hospitals
router.post(
    "/hospitals",
    authenticate,
    authorize("SUPER_ADMIN"),
    validate(createHospitalSchema),
    createHospital
);


// PUT /api/v1/admin/hospitals/:hospitalId
router.put(
    "/hospitals/:hospitalId",
    authenticate,
    authorize("SUPER_ADMIN"),
    validate(updateHospitalSchema),
    updateHospital
);


// DELETE /api/v1/admin/hospitals/:hospitalId
router.delete(
    "/hospitals/:hospitalId",
    authenticate,
    authorize("SUPER_ADMIN"),
    deleteHospital
);

module.exports = router;