const express = require("express");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");

const {
    getAmbulance,
    updateAmbulance,
    deleteAmbulance,
    updateAmbulanceContact,
} = require("../controllers/ambulance-admin.controller");

const router = express.Router();


// ============================================================
// AMBULANCE MANAGEMENT
// ============================================================

router.put(
    "/:ambulanceId/contact",
    authenticate,
    authorize("AMBULANCE_ADMIN"),
    updateAmbulanceContact
);

router.get(
    "/:ambulanceId",
    authenticate,
    authorize("AMBULANCE_ADMIN"),
    getAmbulance
);

router.put(
    "/:ambulanceId",
    authenticate,
    authorize("AMBULANCE_ADMIN"),
    updateAmbulance
);

router.delete(
    "/:ambulanceId",
    authenticate,
    authorize("AMBULANCE_ADMIN"),
    deleteAmbulance
);


module.exports = router;