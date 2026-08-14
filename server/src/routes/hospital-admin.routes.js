const express = require("express");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");

const {
    getMyHospital,
    getMyAssignments,
    getDashboard,
    getActiveCases,
    getReservations,
    getReservationById,
    approveReservation
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

module.exports = router;