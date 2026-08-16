const express = require("express");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../middlewares/validate.middleware");

const { updateBedStatusSchema } = require("../validations/hospital-admin.validation");

const {
    getMyHospital,
    getMyAssignments,
    getDashboard,
    getActiveCases,
    getReservations,
    getReservationById,
    approveReservation,
    getBeds,
    updateBedStatus,
} = require("../controllers/hospital-admin.controller");

const router = express.Router();

// ============================================================
// HOSPITAL INFORMATION
// ============================================================

// GET /api/v1/hospital/my-hospital
router.get(
    "/my-hospital",
    authenticate,
    authorize("HOSPITAL_ADMIN"),
    getMyHospital
);

// GET /api/v1/hospital/my-assignments
router.get(
    "/my-assignments",
    authenticate,
    authorize("HOSPITAL_ADMIN"),
    getMyAssignments
);

// GET /api/v1/hospital/dashboard
router.get(
    "/dashboard",
    authenticate,
    authorize("HOSPITAL_ADMIN"),
    getDashboard
);

// GET /api/v1/hospital/dashboard/active-cases
router.get(
    "/dashboard/active-cases",
    authenticate,
    authorize("HOSPITAL_ADMIN"),
    getActiveCases
);

/// ------> we will write code for reservation

router.get(
    "/reservations",
    authenticate,
    authorize("HOSPITAL_ADMIN"),
    getReservations
);

router.get(
    "/reservations/:reservationId",
    authenticate,
    authorize("HOSPITAL_ADMIN"),
    getReservationById
);

router.put(
    "/reservations/:reservationId/approve",
    authenticate,
    authorize("HOSPITAL_ADMIN"),
    approveReservation
);


/// ------> we will write code for beds

router.get(
    "/beds",
    authenticate,
    authorize("HOSPITAL_ADMIN"),
    getBeds
);

// PUT /api/v1/hospital/beds/:bedId/status
router.put(
    "/beds/:bedId/status",
    authenticate,
    authorize("HOSPITAL_ADMIN"),
    validate(updateBedStatusSchema),
    updateBedStatus
);

module.exports = router;